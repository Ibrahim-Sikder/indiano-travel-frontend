import { setAccessToken } from "../setAccessToken";

export const verifyOTP = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  if (userInfo?.data?.accessToken) {
    setAccessToken(userInfo?.data?.accessToken, { redirect: "/dashboard" });
  }
  return userInfo;
};
