import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DropDown = () => {
  const { token, handleLogOutUser } = useAuth();

  return (
    <div className="absolute z-10 top-10 right-1 lg:right-[-27px] lg:top-[-100px]">
      {token ? (
        <div>
          <button
            onClick={() => {
              handleLogOutUser();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-colors"
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Link
            to="/signup"
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-colors text-center"
          >
            SignUp
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-colors text-center"
          >
            SignIn
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropDown;
