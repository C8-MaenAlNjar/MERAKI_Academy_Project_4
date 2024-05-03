import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [currentToken, setCurrentToken] = useState(
    Cookies.get("token") || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    // Check for token in cookies when component mounts
    const token = Cookies.get("token");
    if (token) {
      setCurrentToken(token);
    }
    
  }, [currentToken]);
  return (
    <AuthContext.Provider value={{ currentToken, currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
