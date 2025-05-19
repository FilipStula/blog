import React, { useEffect, useState } from "react";
import { useFetchBlogByIdQuery } from "../../redux/features/blogs/singleBlog";
import { Link, useParams } from "react-router-dom";

const SingleBlog = ({ }) => {
  const { blogId } = useParams();

  useEffect(() => {
  }, [blogId]);
  const { data: blog} = useFetchBlogByIdQuery(blogId);
  const {post, comments} = blog || {};
  console.log(post)
  const {title} = post || {};
  console.log(title)
   return (
    <div className="mt-20">
        <h1 className="text-3xl">{title}</h1>
    </div>
  );
};

export default SingleBlog;
