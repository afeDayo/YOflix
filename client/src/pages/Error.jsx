import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <main className=" text-white h-screen flex justify-center items-center ">
      <div className=" text-center  ">
        <h1 className="text-xl md:text-7xl ">OOOps!!</h1>
        <h1 className="text-xl md:text-3xl mb-6">404-Page Not Found</h1>
        <div className="flex gap-4 justify-center items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white text-[#161D2F]  hover:bg-[#161D2F] hover:text-white p-2.5 md:p-3  rounded-2xl cursor-pointer flex items-center justify-center gap-1 "
          >
            {" "}
            <RiArrowGoBackFill />
            Back
          </button>

          <Link to="/">
            <button
              type="button"
              className="bg-white  text-[#161D2F] hover:bg-[#161D2F] hover:text-white p-2.5 md:p-3 rounded-2xl cursor-pointer flex items-center justify-center gap-1 "
            >
              {" "}
              <IoHome />
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error404;
