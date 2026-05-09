import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const TRAILER_MAP = {
  "Madame Web": "s_76M4c4LTo",
  "V for Vendetta": "AVaXDAqkKAQ",
  "Avengers: Endgame": "hA6hldpSTF8",
  Hitman: "alQlJDRnQkE",
  "Hobbs & Shaw": "9SA7FaKxZVI",
  It: "FnCdOQsX5kc",
  Joker: "t433PEQGErc",
  After: "g99KPOpqZ4Q",
  "The Killing of a Sacred Deer": "4W4v2FRZNlE",
  Apocalypto: "WV55xFC_GUc",
  "Game of Thrones": "rlR4PJn8b8I",
  "From Scratch": "LB9Pxrb9lw4",
  24: "-Tldme1j_Ec",
  See: "Qte-jEz-2s0",
  "Money Heist": "_InqQJRqGW4",
  "Peaky Blinders": "lcvUGs3xaDM",
  "How to Get Away with Murder": "dkb-aBaxkVk",
  "Rurouni Kenshin": "NgvxSqnA1jM",
  "The Blacklist": "SGB5cMf0r4I",
  "Prison Break": "AL9zLctDJaU",
  "World War Z": "Md6Dvxdr0AQ",
  "Justice League": "Ga2z7GPSVCo",
  From: "GV-amY8PMu0",
  Spartacus: "ptX_pjz5s2k",
  "Project Hail Mary": "m08TxIsFTRI",
  "Avengers: Doomsday": "399Ez7WHK5s",
  "Avatar: Fire and Ash": "nb_fFj_0rq8",
  "The Super Mario Galaxy Movie": "GuCejewteF8",
  "Computer Science": "tpIctyqH29Q",
  "Mission: Impossible - The Final Reckoning": "NOhDyUmT9z0",
  "Data Analysis in 5mins": "37x5dKW-X5U&t=11s",
  Sinners: "7joulECTx_U",
  Thunderbolts: "hUUszE29jS0",
  "Cyber Security": "ey4dXseAODE",
  Superman: "Ox8ZLF6cGM0",
  "Web Development": "JnX7wyRvqlM",
  "The Wild Robot": "67vbA5ZJdKQ",
  "Inside Out 2": "LEjhY15eCx0",
  "UI/UX Concepts": "ODpB9-MCa5s",
  "Deadpool & Wolverine": "73_1biulkYk",
  "Intro to Typescript": "V78lbWLKMxo",
  "Spider-Man: Across the Spider-Verse": "shW9i6k8cB0",
  CSS: "tfzGsCxutWk",
  "Guardians of the Galaxy Vol. 3": "u3V5KDHRQvk",
  "Intro To HTML": "DgRngrWG59o",
  "John Wick: Chapter 4": "qEVUtrk8_B4",
  Oppenheimer: "bK6ldnjE3Y0",
  "Dune: Part Two": "Way9Dexny3w",
  "The Bear": "gBmkI4jlaIo",
  Severance: "_UXKlYvLGJY",
  "Gladiator II": "4rgYUipGJNo",
  Shogun: "yAN5uspO_hk",
  Barbie: "pBk4NYhWNMM",
  "Spider-Man: Brand New Day": "8TZMtslA3UY",
  "The Odyssey": "f_bKjZeJBBI",
};

const VideoModal = ({ movie, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const videoId = TRAILER_MAP[movie.title];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
    >
      <div className="relative w-full max-w-[900px] mx-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-white text-[18px] sm:text-[22px] font-normal m-0">
              {movie.title}
            </h2>
            <p className="text-[#5a698f] text-[13px] m-0">
              {movie.year} &nbsp;·&nbsp;{" "}
              {movie.type === "movie" ? "Movie" : "TV Series"} &nbsp;·&nbsp;{" "}
              {movie.rated}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#fc4747] transition-colors text-[28px] leading-none cursor-pointer bg-transparent border-0 p-1"
            aria-label="Close video"
          >
            <IoClose />
          </button>
        </div>

        <div
          className="relative w-full rounded-[12px] overflow-hidden"
          style={{ paddingTop: "56.25%" }}
        >
          {videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161d2f] text-white">
              <p className="text-[18px] font-normal m-0">Trailer unavailable</p>
              <p className="text-[#5a698f] text-[14px] mt-2">
                No trailer found for "{movie.title}"
              </p>
            </div>
          )}
        </div>

        <p className="text-[#5a698f] text-[12px] text-center mt-3">
          Press{" "}
          <kbd className="px-1 py-0.5 rounded bg-[#161d2f] text-[#ffffff] text-[11px]">
            Esc
          </kbd>{" "}
          or click outside to close
        </p>
      </div>
    </div>
  );
};

export default VideoModal;
