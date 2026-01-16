import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER =
  "https://via.placeholder.com/500x750?text=No+Poster";

function MovieCard({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name || "Nomsiz";
  const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : FALLBACK_POSTER;

  // vote_average 0 bo‘lsa ham ko‘rsatsin
  const rating =
    typeof movie.vote_average === "number"
      ? Math.round(movie.vote_average)
      : null;

  const isAdult = Boolean(movie.adult);

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div
        className="
          rounded-2xl overflow-hidden relative group cursor-pointer
          min-w-[260px]
          max-sm:min-w-[100px]
          md:min-w-[220px]
          lg:min-w-[260px]
          sm:max-w-[130px]
        "
      >
        {rating !== null && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-sm font-semibold absolute top-2 right-2 z-50">
            <FaStar className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}

        {isAdult && (
          <div className="top-2 left-2 absolute w-8 h-8 z-10 flex items-center justify-center text-xs rounded-full bg-red-600">
            <span className="text-white">18+</span>
          </div>
        )}

        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_POSTER;
          }}
        />

        <div
          className="
            absolute left-1/2 -translate-x-1/2 w-full
            px-6 py-3 text-center text-white
            bg-black/40 backdrop-blur-md rounded-xl
            transition-all duration-300 ease-out
            -bottom-32 group-hover:bottom-0
            max-sm:px-2 max-sm:py-1 max-sm:bottom-0
          "
        >
          <h3 className="text-lg font-bold max-sm:text-[14px] max-sm:font-normal line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-200 underline">Ko'rish</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
