import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Redux is used to make api calls to our backend
// https://redux.js.org/api/api-reference

export const singleBlogApi = createApi({
  reducerPath: "singleBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  endpoints: (builder) => ({
    fetchBlogById: builder.query({
      query: (blogId) => `blogs/${blogId}`,
    }),
  }),
});

export const { useFetchBlogByIdQuery } = singleBlogApi;
