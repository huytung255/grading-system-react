import React from "react";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
function RequireSignOut({ children }) {
  // const { isAuthenticated } = useSelector((state) => state.user);

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default RequireSignOut;
