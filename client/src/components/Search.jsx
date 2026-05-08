import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInput, setUserInput] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search for movies, TV series, or bookmarked shows",
  );

  const location = useLocation();
  useEffect(() => {
    setUserInput(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setPlaceholder(
      `Search for ${
        location.pathname === "/"
          ? "movies, TV series"
          : location.pathname.substring(1)
      }`,
    );
  }, [location]);

  return (
    <div
      className="
        flex items-center justify-start gap-[24px] ml-[16px] mt-[24px] sm:ml-[25px] md:mt-[130px] lg:mt-[64px]"
    >
      <div className="telo mt-1">
        <IoSearch className="text-[18px] mb-[8px] md:text-[24px] md:mb-0 desktop:text-[24px] text-white" />
      </div>

      <div className="search">
        <input
          type="text"
          className="max-w-[260px] pt-2 border-0 bg-[#10141e] text-[#ffffff] text-[16px] font-normal outline-0 placeholder:text-[16px] placeholder:font-normal placeholder:text-[#5a698f] focus:border-b-[1px] focus:border-b-[#5a698f] focus:caret-[#fc4747] md:max-w-[650px] md:text-[24px] md:placeholder:text-[24px] desktop:w-[1100px] desktop:pb-[18px] desktop:text-[24px] desktop:placeholder:text-[24px]"
          onChange={(event) => {
            setSearchParams({ search: event.target.value });
            setUserInput(event.target.value);
          }}
          value={userInput}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Search;
