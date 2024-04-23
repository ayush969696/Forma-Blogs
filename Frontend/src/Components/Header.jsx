import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contextAPI/Auth";

function Header() {
  const [toggle, setToggle] = useState(false);
  const { isLoggedIn, LogoutUser } = useAuth();

  const handlingLogout = () => {
    LogoutUser();
  };

  return (
    <div className="bg-green-500 md:p-6 p-2 font-Alice shadow-xl">
      <div className="flex justify-between items-center mt-4 max-w-[1240px]  mx-auto">
        <div className="text-3xl font-bold text-white">
          <NavLink to="/">Forma Blogs</NavLink>
        </div>

        {isLoggedIn && (
          <div className="hidden md:flex  gap-10 text-xl font-bold uppercase text-white cursor-pointer">
            <NavLink to={"./blogs"}>Blogs</NavLink>
            <NavLink to={"./my-blogs"}>My Blogs</NavLink>
            <NavLink to={"./create-blog"}>Create Blog</NavLink>
          </div>
        )}

        <div className="md:hidden flex justify-center h-[50px] w-8">
          {toggle ? (
            <a
              href="#"
              className="text-3xl text-white"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              ✕
            </a>
          ) : (
            <a
              href="#"
              className="text-4xl text-whiteborder text-white"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              &#8801;
            </a>
          )}
        </div>
        <ul
          className={`duration-500 md:hidden fixed top-[82px] uppercase bg-green-600 w-full h-screen text-lg font-bold text-white cursor-pointer
          ${toggle ? "left-[0]" : "left-[-100%]"}  
        `}
        >
          {!isLoggedIn ? (
            <>
              <NavLink to={"./login"}>
                <li className="px-6 py-4">Login</li>
              </NavLink>
              <NavLink to={"./register"}>
                <li className="px-6 py-4">Register</li>
              </NavLink>
            </>
          ) :
          (
            <>
              <NavLink to={"./blogs"}>
                <li className="px-6 py-4">Blogs</li>
              </NavLink>
              <NavLink to={"./my-blogs"}>
                <li className="px-6 py-4">My Blogs</li>
              </NavLink>
              <NavLink to={"./create-blog"}>
                <li className="px-6 py-4">Create Blog</li>
              </NavLink>
              <button onClick={handlingLogout}>
                <li className="px-6 py-4">Logout</li>
              </button>
            </>
          )}
        </ul>

        {/* Responsive Menu Bar */}
        <ul className="hidden md:flex  gap-10 text-xl font-bold uppercase text-white cursor-pointer">
          {!isLoggedIn ? (
            <>
              <NavLink to={"./login"}>
                <li>Login</li>
              </NavLink>
              <NavLink to={"./register"}>
                <li>Register</li>
              </NavLink>
            </>
          ) : (
            <button onClick={handlingLogout}>
              <li>Logout</li>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
