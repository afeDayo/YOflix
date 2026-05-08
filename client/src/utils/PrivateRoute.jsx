import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      toast.error("You have to login first", { id: "zcxc" });
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
