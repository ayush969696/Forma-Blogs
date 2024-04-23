import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlogs() {
  const userID = localStorage.getItem('userID')
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch("http://localhost:8000/api/v1/blog/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: userID
        }),
      });
      let response = await data.json();

      console.log(response);

      if (response && response.success) {
        alert("Blog Created!");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-full py-12 font-Alice  flex justify-center ">
          <div className="lg:w-[40%] w-[55%] h-full shadow-lg">
            <div className="w-full flex justify-center">
              <h1 className="text-2xl font-bold">Create a Blog</h1>
            </div>
            <div className="flex flex-col p-12">
              <label htmlFor="title" className="text-xl py-2">
                Title
              </label>
              <input
                type="text"
                className="border-[2px] border-green-400 rounded-md p-2"
                name="title"
                placeholder="Enter Blog Title"
                value={inputs.title}
                onChange={handleInput}
                required
              />
              <label htmlFor="title" className="text-xl py-2">
                Description
              </label>
              <textarea
                type="text"
                className="border-[2px] border-green-400 rounded-md p-2"
                name="description"
                placeholder="Enter Blog Title"
                value={inputs.description}
                onChange={handleInput}
                required
              />
              <label htmlFor="title" className="text-xl py-2">
                Image URL
              </label>
              <input
                type="text"
                className="border-[2px] border-green-400 rounded-md p-2"
                name="image"
                placeholder="Enter Blog Title"
                value={inputs.image}
                onChange={handleInput}
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="mb-6 border-2 px-16 py-4 border-green-500 rounded-md hover:bg-green-500 hover:text-white"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateBlogs;
