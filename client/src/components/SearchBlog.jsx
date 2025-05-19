import React, { useState } from "react";
import { useLazySearchBlogsQuery } from "../redux/features/blogs/searchBlog.js";

const SearchBlog = ({ onSearch }) => { // Receive onSearch from the parent
  const [search, setSearch] = useState(""); // Local state for input
  const [searched, setSearched] = useState(""); // Local state for displaying searched term
  const [searchDiv, setSearchDiv] = useState(false); // Local state for search div visibility
  const [triggerSearch, { data, error, isLoading }] = useLazySearchBlogsQuery();

  const handleSearch = async () => {
    const result = await triggerSearch(search)
    setSearched(search); // Set the searched term in local state
    setSearch(""); // Clear the input field
    setSearchDiv(true); // Show the search div
    if (onSearch) onSearch(result.data.blogs); // Call the parent function to pass search term
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex gap-4 items-center justify-center mb-8 flex-col">
      {searchDiv && <div>Searched for: {searched}</div>}
      <div className="w-full flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full h-10 border-2 border-gray-300 rounded-md px-4"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer bg-gray-800 px-3 text-white rounded-2xl"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBlog;
