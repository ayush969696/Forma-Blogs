import { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";

function UserBlog() {
  const [blog, setBlogs] = useState([]);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userID");
      const data = await fetch(`http://localhost:8000/api/v1/blog/user-blog/${id}`, {
        method: "GET",
      });

      const response = await data.json();

      if (response && response.success) {
        setBlogs(response.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
        {blog.map((blogItem) => (
          <BlogCard
            key={blogItem._id}
            id={blogItem._id}
            isUser={true}
            title={blogItem.title}
            description={blogItem.description}
            image={blogItem.image}
            username={"Your Blogs"}
            time={blogItem.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default UserBlog;
