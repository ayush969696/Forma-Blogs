import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem("token"))

  // const storeTokenInLocaStore = (servertoken) => {
  //     localStorage.setItem('token', servertoken);
  // }

  // let isLoggedIn = !!token;  //  it simply means if token value is there then isLoggedIn value will be ture and vice versa

  const [isLoggedIn, setIsLoggedIn] = useState( () => {
    const storedvalue = localStorage.getItem('isLoggedIn');
    return storedvalue ? JSON.parse(storedvalue) : false;
    // simpy seting the isLoogedIn last updated value in isLoggedIn state 
  })

  const LogintUser = () => {
    setIsLoggedIn(true);
  };

  const LogoutUser = () => {
   setIsLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, LogintUser, LogoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider!");
  }
  return authContextValue;
};
