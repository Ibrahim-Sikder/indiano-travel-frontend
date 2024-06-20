import { authKey } from "@/constant/authkey";
import { generateNewAccessToken } from "@/services/auth.services";
import { setAccessToken } from "@/services/setAccessToken";
import { ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local.storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // modify request headers
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = "Bearer" + " " + accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // modify response
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const config = error.config;
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const res = await generateNewAccessToken();

      const accessToken = res?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      setAccessToken(accessToken);
      return instance(config);
    }
    return Promise.reject(error);
  }
);
export { instance };
