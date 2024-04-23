import React, { useState } from "react";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) => {

  const [profile, setProfile] = useState();
  const [blogTime, setBlogTime] = useState();
  const navigate = useNavigate();

  function setinguserprofile() {
    let avtar = username.charAt(0);
    setProfile(avtar);
  }
  function setTime() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = new Date(time).toLocaleDateString(undefined, options);
    setBlogTime(formattedDate);
  }

  const handleEdit = () => {
    navigate(`/blog-details/${id}`)
  }

  const handleDelete = async () => {
    try {
      const data = await fetch(`http://localhost:8000/api/v1/blog/delete-blog/${id}`, {
      method: "DELETE",
      })

      let response = await data.json()

      if(response && response.success){
        navigate('/blogs')
        alert("Blog Deleted!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setinguserprofile();
    setTime();
  }, []);

  return (
    <div className="max-w-xs mx-8 my-6 font-Alice">
      <div className="bg-white rounded-lg shadow-md p-1 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center">
              {profile}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-semibold">{username}</h1>
                <p className="text-sm text-gray-500">{blogTime}</p>
              </div>

              {isUser && (
                <div className="flex gap-2">
                  <CiEdit size={22} onClick={handleEdit} color={"green"}/>
                  <MdDelete size={22} onClick={handleDelete} color={"red"} />
                </div>
              )}
            </div>
          </div>
        </div>
        <img src={image} alt="Blogs" className="w-full h-48 object-cover" />
        <div className="w-full mx-4 my-6 ">
          <h1 className="text-2lg font-semibold my-2">Title : {title}</h1>
          <p className="text-md text-gray-800">Description : {description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
