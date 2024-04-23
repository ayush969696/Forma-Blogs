import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/Auth";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {LogintUser} = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password does not match");
      setErrorVisible(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.userName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      console.log(response);

      let data = await response.json();
      console.warn("All Data", data);

      if (data.success) {
        // localStorage.setItem("token", JSON.stringify(data.data));

        // storeTokenInLocaStore(data.token)

        LogintUser();

        setErrorMessage("");
        setFormData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      } else {
        setErrorMessage(data.errorMessage);
      }
      setErrorVisible(true);
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("An error occurred.Please try again later.");
      setErrorVisible(true);
    }
  };

  const handleCloseError = () => {
    setErrorVisible(false);
  };

  return (
    <>
      <section className="flex max-h-full flex-col justify-center px-6 md:py-8 py-2 lg:px-8 font-Alice">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 mb-6 md:mt-10 lg:text-3xl text-xl text-center  font-bold leading-9 tracking-tight text-gray-900">
            Registration Form
          </h2>
          <p className="mt-1 lg:text-md text-sm text-gray-500">
            Create your account. It’s free and only takes a minute.
          </p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3 lg:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Enter Your username"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter Your Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end lg:justify-start">
              <div>
                <input
                  type="checkbox"
                  className="border border-gray-400"
                  required
                />{" "}
                <span>
                  I accept the{" "}
                  <NavLink to="#" className="text-green-500 font-semibold">
                    Terms of Use
                  </NavLink>{" "}
                  &amp;{" "}
                  <NavLink to="#" className="text-green-500 font-semibold">
                    Privacy Policy
                  </NavLink>
                </span>
              </div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Now
              </button>
            </div>
            <div
              className={`h-1 transition-all ${
                errorVisible ? "" : "opacity-0"
              }`}
            >
              {errorMessage && (
                <div
                  className="bg-red-100 border-2 border-red-700 text-black px-4 py-3 rounded relative top-[-510px]  lg:relative lg:top-[-460px]"
                  role="alert"
                >
                  <strong className="font-bold">OPPS!: </strong>
                  <span className="block sm:inline">{errorMessage}</span>
                  <span
                    className="absolute top-0 bottom-0 right-0 px-2 py-1 cursor-pointer"
                    onClick={handleCloseError}
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
