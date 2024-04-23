import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./Pages/Blogs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserBlog from "./Pages/UserBlog";
import CreateBlogs from "./Pages/CreateBlogs";
import BlogDetails from "./Pages/BlogDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs"  element={<UserBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;
