import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchBlogApi = createApi({
  reducerPath: "searchBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  endpoints: (builder) => ({
    searchBlogs: builder.query({
      query: (searchTerm) => `blogs/search?title=${searchTerm}`,
    }),
  }),
});

export const { useSearchBlogsQuery,useLazySearchBlogsQuery  } = searchBlogApi;
