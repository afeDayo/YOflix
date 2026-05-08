import { useState } from "react";
import { RiFilmFill } from "react-icons/ri";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { IoMdPlayCircle } from "react-icons/io";
import { PiTelevisionFill } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import VideoModal from "../../components/VideoModal";

const MovieCarousel = ({ data, updateUI }) => {
  const { user, token } = useAuth();
  const [activeVideo, setActiveVideo] = useState(null); // holds the movie object to play

  return (
    <>
      <div className="relative overflow-x-auto w-full">
        <div className="flex justify-start items-center gap-3 transition-all duration-1000 ease-in-out md:gap-5">
          {data.slice(0, 12).map((movie) => {
            const { _id, image, title, year, type, rated, bookmarkedBy } =
              movie;

            const bookmarkIcon = bookmarkedBy.includes(user?.id) ? (
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
              <div key={_id} className="relative mt-6">
                <div className="sm:w-[470px] sm:h-[230px] overflow-hidden relative w-[240px] group h-[140px]">
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg filter brightness-[70%]"
                    alt={title}
                  />

                  {/* Bookmark */}
                  <div className="absolute top-1 right-3 md:top-3.5 md:right-6 text-white cursor-pointer w-[50px] h-[50px] rounded-full hover:bg-[#10141E50] flex items-center justify-center z-30 text-[25px]">
                    {bookmarkIcon}
                  </div>

                  {/* Play button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideo(movie)}
                    className={
                      "absolute top-11 left-17 md:top-22 py-1.5 ps-1.5 pe-4 md:left-45 flex items-center justify-center rounded-full " +
                      "bg-[#FFFFFF25] backdrop-blur-sm gap-3 z-20 cursor-pointer " +
                      "transition-opacity duration-200 " +
                      "opacity-100 pointer-events-auto " +
                      "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
                    }
                  >
                    <IoMdPlayCircle className="text-white text-[24px] md:text-[40px]" />
                    <p className="text-[14px] md:text-[16px] text-white m-0">
                      Play
                    </p>
                  </button>
                </div>

                <div className="absolute bottom-5 left-6 flex flex-col justify-start items-start text-start">
                  <div className="flex justify-start items-center gap-2 text-white text-sm font-normal md:gap-1 md:text-xs">
                    <p className="m-0 text-[8px] sm:text-[12px] lg:text-[13px] font-normal text-white">
                      {year}
                    </p>
                    <p className="dott mb-1 text-[3px] font-semibold leading-none">
                      .
                    </p>
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
                    <p className="dott mb-1 text-[3px] font-semibold leading-none">
                      .
                    </p>
                    <p className="m-0 text-[8px] sm:text-[12px] lg:text-[13px] font-normal text-white">
                      {rated}
                    </p>
                  </div>
                  <p className="m-0 text-[12px] sm:text-[16px] lg:text-[18px] font-normal text-white">
                    {title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Single shared modal for carousel — renders outside the scroll container */}
      {activeVideo && (
        <VideoModal movie={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
};

export default MovieCarousel;
