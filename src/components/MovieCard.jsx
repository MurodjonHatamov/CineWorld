import React from 'react'

function MovieCard({movie}) {

    
  return (
    <div className=" rounded-2xl overflow-hidden relative group cursor-pointer min-w-[260px]      
    max-sm:min-w-[100px]
    md:min-w-[220px]
    lg:min-w-[260px]
sm:max-w-[130px]

    
    " >
      
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      <div
        className="
          absolute -bottom-32 left-1/2 -translate-x-1/2
          w-full
          px-6 py-3
          text-center text-white
          bg-black/40
          backdrop-blur-md
          rounded-xl
          transition-all duration-300 ease-out
          group-hover:-bottom-0
          max-sm:px-2 max-sm:py-1
max-sm:-bottom-0

        "
      >
        <h3 className="text-lg font-bold   max-sm:text-[14px] max-sm:font-normal line-clamp-1">{movie?.title ? movie.title : movie.name}</h3>
        <p className="text-sm text-gray-200 underline">Ko'rish </p>
      </div>

    </div>
  )
}

export default MovieCard
