import { PiTelevisionFill } from "react-icons/pi";
import { MdWindow } from "react-icons/md";
import { RiFilmFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa";
import logo from "../assets/entertainment app logo.png";
import { Link, useLocation } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { useEffect, useState } from "react";
import DropDown from "./Dropdown";

const SideBar = () => {
  const [selected, setSelected] = useState("/");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    setSelected(pathname);
  }, [location]);

  const isIconSelected = (path) => {
    return selected === path ? "#FFFFFF" : "#5A698F";
  };
  return (
    <div className="md:mt-[23px] md:mx-[25px] md:fixed md:top-0 md:left-0 sm:w-full md:w-[95%]">
      <div className="w-full bg-[#161d2f] py-[18px] px-[16px] flex items-center justify-between md:rounded-[10px] md:py-[24px] md:px-[24px] lg:absolute lg:flex-col lg:justify-center lg:items-center lg:top-[32px] lg:left-[32px] lg:max-w-[96px] lg:rounded-[20px] lg:py-[35.41px] lg:px-[31.86px]">
        <Link className="redmovie" to="/">
          <MdMovie className="text-[32px] text-[#FC4747]" />
        </Link>

        <div className="w-[133.54px] flex items-center justify-between md:w-[172.92px] lg:flex-col lg:justify-center lg:items-center lg:gap-[40px] lg:mt-[74.99px]">
          <Link
            to="/"
            style={{
              color:
                selected === "/"
                  ? "#FFFFFF"
                  : hoveredIcon === "/"
                    ? "#FC4747"
                    : "#5A698F",
            }}
            onMouseEnter={() => {
              return setHoveredIcon("/");
            }}
            onMouseLeave={() => {
              return setHoveredIcon(null);
            }}
          >
            <MdWindow className="text-[16px] md:text-[20px]" />
          </Link>
          <Link
            to="/movies"
            style={{
              color:
                selected === "/movies"
                  ? "#FFFFFF"
                  : hoveredIcon === "/movies"
                    ? "#FC4747"
                    : "#5A698F",
            }}
            onMouseEnter={() => {
              return setHoveredIcon("/movies");
            }}
            onMouseLeave={() => {
              return setHoveredIcon(null);
            }}
          >
            <RiFilmFill className="text-[16px] md:text-[20px]" />
          </Link>
          <Link
            to="/tvseries"
            style={{
              color:
                selected === "/tvseries"
                  ? "#FFFFFF"
                  : hoveredIcon === "/tvseries"
                    ? "#FC4747"
                    : "#5A698F",
            }}
            onMouseEnter={() => {
              return setHoveredIcon("/tvseries");
            }}
            onMouseLeave={() => {
              return setHoveredIcon(null);
            }}
          >
            <PiTelevisionFill className="text-[16px] md:text-[20px]" />
          </Link>
          <Link
            to="/bookmark"
            style={{
              color:
                selected === "/bookmark"
                  ? "#FFFFFF"
                  : hoveredIcon === "/bookmark"
                    ? "#FC4747"
                    : "#5A698F",
            }}
            onMouseEnter={() => {
              return setHoveredIcon("/bookmark");
            }}
            onMouseLeave={() => {
              return setHoveredIcon(null);
            }}
          >
            <FaBookmark className="w-[13.54px] h-[16px] md:w-[16.92px] md:h-[20px]" />
          </Link>
        </div>

        <div className="lg:mt-[120px] relative">
          <img
            src={logo}
            alt="applogo"
            className="w-[24px] md:w-[32px] lg:w-[40px] cursor-pointer"
            onClick={() => {
              setToggleDropDown(!toggleDropDown);
            }}
          />
          {toggleDropDown ? <DropDown /> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
