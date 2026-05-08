import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdMovie } from "react-icons/md";

const AuthLayout = () => {
  return (
    <div className="mb-[100px]">
      <Link className="inline-block" to="/" aria-label="Home">
        <MdMovie className="mt-[78.41px] text-[32px] text-[#FC4747]" />
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
