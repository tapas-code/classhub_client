import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedImg = localStorage.getItem("img");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setUserImg(storedImg);
      setIsLoggedIn(true); 
    }
  }, []);

  const saveTokenLS = (token, role, img) => {
    setToken(token);
    setUserRole(role);
    setIsLoggedIn(true);
    setUserImg(img);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("img", img);
  };

  const logoutUser = () => {
    setToken("");
    setUserRole("");
    setUserImg("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("img");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userRole, userImg, saveTokenLS, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
