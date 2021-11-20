import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default RequireAuth;
