import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Redux is used to make api calls to our backend
// https://redux.js.org/api/api-reference

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `blogs`,
    })
  }),
});

export const { useFetchBlogsQuery } = blogsApi;
