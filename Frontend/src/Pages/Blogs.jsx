import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BlogCard from "../Components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/v1/blog/all-blog", {
        method: "GET",
      });

      let response = await data.json();

      console.log("res : ", response)

      if (response && response.success) {
        setBlogs(response && response.blogs);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-wrap">
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
          key={blog._id} 
          id={blog._id}
          isUser={localStorage.getItem('userID') === blog.user._id}  // here checking that if the userID match to the blog's user id 
          title={blog.title} 
          description={blog.description} 
          image={blog.image} 
          username = {blog.user.username}
          time={blog.createdAt}
          />
        ))}
    </div>
  );
}

export default Blogs;
