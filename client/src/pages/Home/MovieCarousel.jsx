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
                      "bg-[#FFFFFF25] backdrop-blur-sm gap-3 " +
                      "opacity-0 pointer-events-none transition-opacity duration-200 " +
                      "group-hover:opacity-100 group-hover:pointer-events-auto " +
                      "focus:opacity-100 focus:pointer-events-auto z-20 cursor-pointer"
                    }
                  >
                    <IoMdPlayCircle className="text-white text-[40px]" />
                    <p className="text-[16px] text-white m-0">Play</p>
                  </button>
                </div>

                {/* Movie info overlay */}
                <div className="absolute bottom-5 left-6 flex flex-col justify-start items-start">
                  <div className="flex justify-start items-center gap-2 text-white text-sm font-normal md:gap-1 md:text-xs">
                    <p className="m-0">{year}</p>
                    <p className="mb-0.5">.</p>
                    <span className="flex justify-start items-center gap-1 md:gap-0.5">
                      {type === "movie" ? <RiFilmFill /> : <PiTelevisionFill />}
                      <p className="m-0">
                        {type === "movie" ? "Movie" : "TV Series"}
                      </p>
                    </span>
                    <p className="mb-0.5">.</p>
                    <p className="m-0">{rated}</p>
                  </div>
                  <p className="m-0 text-white text-xl font-normal md:text-sm">
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
