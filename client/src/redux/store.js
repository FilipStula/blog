import { configureStore } from '@reduxjs/toolkit';
import { blogsApi } from './features/blogs/blogsApi';
import { singleBlogApi } from './features/blogs/singleBlog';
import { searchBlogApi } from './features/blogs/searchBlog';
import { authApi } from './features/auth/authApi';
import {fetchUser} from './features/auth/authSlice'
import authReducer from './features/auth/authSlice'
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [blogsApi.reducerPath]: blogsApi.reducer,
    [singleBlogApi.reducerPath]: singleBlogApi.reducer,
    [searchBlogApi.reducerPath]: searchBlogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware).concat(singleBlogApi.middleware).concat(searchBlogApi.middleware).concat(authApi.middleware),
})

