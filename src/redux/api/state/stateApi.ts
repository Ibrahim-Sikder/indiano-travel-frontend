import { baseApi } from "../baseApi";

const stateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    crateState: build.mutation({
      query: (data) => ({
        url: "/states/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const { useCrateStateMutation } = stateApi;
