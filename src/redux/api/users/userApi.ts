import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        data,
      }),
    }),
    getAllUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery } = userApi;
