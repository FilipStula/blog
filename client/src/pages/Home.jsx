import React, { useState, useEffect } from "react";
import SearchBlog from "../components/SearchBlog";
import { useFetchBlogsQuery } from "../redux/features/blogs/blogsApi";
import { Link, useLocation } from "react-router-dom";
import { useLazySearchBlogsQuery } from "../redux/features/blogs/searchBlog.js";
import { useSelector } from "react-redux";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState({ search: "", category: "" });
  const [allBlogs, setAllBlogs] = useState(true);
  const location = useLocation();

  // getting ddata using redux
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchResults(event);
  };

  useEffect(() => {
    console.log("Search results updated:", searchResults);
  }, [searchResults]);

  const {
    data: blogsApi = [],
    error,
    isLoading,
  } = useFetchBlogsQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (searchResults.length > 0) {
      setBlogs(searchResults); // Set the search results to blogs state
    } else setBlogs(blogsApi);
  }, [blogsApi, searchResults]);

  return (
    <div className="items-center justify-center h-screen bg-gray-100 p-16 sm:p-8 md:p-12 lg:p-16 xl:p-20">
      <div className="flex flex-col items-center justify-center mb-8"></div>
      <SearchBlog onSearch={handleSearch} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`./blogs/${blog._id}`}
            className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <h1 className="p-3">{blog.title}</h1>
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
