import { useState } from "react";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionFill } from "react-icons/pi";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { IoMdPlayCircle } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import VideoModal from "./VideoModal";

const MovieCard = ({ movie, updateUI }) => {
  const { user, token } = useAuth();
  const { _id, image, title, year, type, rated, bookmarkedBy = [] } = movie;
  const [showVideo, setShowVideo] = useState(false);

  const isBookmarked =
    Array.isArray(bookmarkedBy) && bookmarkedBy.includes(user?.id);

  const bookmarkIcon = isBookmarked ? (
    <IoBookmark
      onClick={(e) => {
        e.stopPropagation();
        updateUI("remove", _id, token, user?.id);
      }}
      className="md:text-[25px] text-[20px]"
    />
  ) : (
    <IoBookmarkOutline
      onClick={(e) => {
        e.stopPropagation();
        updateUI("add", _id, token, user?.id);
      }}
      className="md:text-[25px] text-[20px]"
    />
  );

  return (
    <>
      <div className="movie-card flex flex-col justify-start items-center">
        <div className="maincards relative mt-6 sm:w-[220px] sm:h-[140px] sm:mt-6 lg:w-[280px] lg:h-[174px] lg:mt-8 group">
          <img
            src={image}
            className="object-cover rounded-lg h-[98px] sm:h-[140px] md:h-[174px] w-[173px] sm:w-[220px] md:w-[280px]"
            alt={title}
          />

          {/* Bookmark button */}
          <div className="bkmak absolute top-1 right-3 md:top-3.5 md:right-6 text-white cursor-pointer w-[50px] h-[50px] rounded-full hover:bg-[#10141E50] flex items-center justify-center z-30">
            {bookmarkIcon}
          </div>

          {/* Play overlay */}
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className={
              "absolute top-10 left-13 md:top-18 py-1.5 ps-1.5 pe-4 md:left-25 flex items-center justify-center rounded-full " +
              "bg-[#FFFFFF25] backdrop-blur-sm gap-2 z-20 cursor-pointer " +
              "transition-opacity duration-200 " +
              "opacity-100 pointer-events-auto " +
              "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
            }
          >
            <IoMdPlayCircle className="text-white text-[24px]" />
            <p className="text-[14px] text-white m-0">Play</p>
          </button>
        </div>

        <div className="movie-details flex flex-col justify-start items-start py-4">
          <div className="cardico flex items-center justify-start gap-[3px] sm:gap-[5px] lg:gap-[7px]">
            <p className="m-0 text-[8px] sm:text-[12px] lg:text-[13px] font-normal text-white">
              {year}
            </p>
            <p className="dott mb-1 text-[3px] font-semibold leading-none">.</p>
            <span className="doicon flex items-center justify-start gap-[3px] sm:gap-[5px] text-white">
              {type === "movie" ? (
                <RiFilmFill className="text-[15px]" />
              ) : (
                <PiTelevisionFill className="text-[15px]" />
              )}
              <p className="m-0 tvvvm text-[8px] sm:text-[12px] lg:text-[13px] font-normal">
                {type === "movie" ? "Movie" : "TV Series"}
              </p>
            </span>
            <p className="dott mb-1 text-[3px] font-semibold leading-none">.</p>
            <p className="m-0 text-[8px] sm:text-[12px] lg:text-[13px] font-normal text-white">
              {rated}
            </p>
          </div>
          <div className="cardtits text-start">
            <p className="m-0 text-[12px] sm:text-[16px] lg:text-[18px] font-normal text-white">
              {title}
            </p>
          </div>
        </div>
      </div>

      {showVideo && (
        <VideoModal movie={movie} onClose={() => setShowVideo(false)} />
      )}
    </>
  );
};

export default MovieCard;
