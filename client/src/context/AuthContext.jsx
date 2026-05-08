import { createContext, useState, useEffect } from "react";

import axiosInstance from "../utils/axiosConfig";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const [authenticating, setAuthenticating] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUser = async (formData) => {
    setAuthenticating(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/register", formData);
      toast.success("Registration Successful", { id: "uufdgtr" });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser({ id: data.user._id });
      navigate("/");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLoginUser = async (formData) => {
    setAuthenticating(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/login", formData);
      toast.success("Welcome Back", { id: "hcgmg" });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser({ id: data.user._id });
      navigate("/");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  const handleGetUser = async () => {
    if (!token) return;
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogOutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("See you soon", { id: "lllkk" });
    navigate("/signin");
  };

  const handleAuthError = (error) => {
    if (error.response) {
      toast.error(error.response.data?.message || "Something went wrong", {
        id: "auth-error",
      });
    } else {
      toast.error("Something went wrong", { id: "qasw" });
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [token]);

  const contextData = {
    user,
    token,
    handleRegisterUser,
    handleLoginUser,
    authenticating,
    handleGetUser,
    handleLogOutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
