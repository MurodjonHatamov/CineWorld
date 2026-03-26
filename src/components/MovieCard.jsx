import React from "react";
import { FaStar, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  if (!movie) return null;


  const title = movie.title || movie.name || "Nomsiz";
  const hasPoster = Boolean(movie.poster_path);
  const poster = hasPoster ? `${IMG_BASE}${movie.poster_path}` : null;
const releaseDate = movie.release_date || movie.first_air_date || "N/A";
  const rating =
    typeof movie.vote_average === "number"
      ? Math.round(movie.vote_average)
      : null;

 const isMovie = !!movie.title;
  const type=isMovie ? "movie" : "tv"

      
  return (
    <Link to={ `/detail/${type}/${movie.id}` } className="block">
      <div
        className="
          rounded-2xl overflow-hidden relative group cursor-pointer
          min-w-[200px]
          max-w-[220px]
          max-sm:min-w-[160px]
          max-sm:max-w-[180px]
          md:min-w-[180px]
          lg:min-w-[200px]
        "
      >
        {
          movie ? <>
          {/* ⭐ Rating */}
        {rating !== null && (
          <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-sm font-semibold">
            <FaStar className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}

        {/* 🔞 Adult */}
        {movie.adult && (
          <div className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            18+
          </div>
        )}

        {/* 🖼 IMAGE OR ANIMATED PLACEHOLDER */}
        {hasPoster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="
              w-full h-full aspect-[2/3]
              flex flex-col items-center justify-center
              bg-gradient-to-br from-black/10 via-black/30 to-black/90
              animate-pulse
            "
          >
            <FaImage className="text-4xl text-white/40 mb-2" />
            <span className="text-white/40 text-sm tracking-wide">
              No Image
            </span>
          </div>
        )}

        {/* 👇 Hover Overlay */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 w-full
            px-6 py-3 text-center text-white
            bg-black/50 backdrop-blur-md
            transition-all duration-300 ease-out
            -bottom-32 group-hover:bottom-0
            max-sm:bottom-0 max-sm:px-2 max-sm:py-1
          "
        >
          <h3 className="text-lg font-bold max-sm:text-sm line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-300 ">
            {releaseDate}
          </p>
        </div></> :
        <h1>salom</h1>
        }
      </div>
    </Link>
  );
}

export default MovieCard;
