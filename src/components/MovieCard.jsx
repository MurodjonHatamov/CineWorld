import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function MovieCard({movie}) {

    console.log(movie);
    
  return (
<Link to={`/movie/${movie.id}`}>
<div className=" rounded-2xl overflow-hidden relative group cursor-pointer min-w-[260px]      
    max-sm:min-w-[100px]
    md:min-w-[220px]
    lg:min-w-[260px]
sm:max-w-[130px]

    
    " >


<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-sm font-semibold absolute top-2 right-2 z-50">
  <FaStar className="text-yellow-400" />
  <span>{Math.round(movie.vote_average)}</span>
</div>

{movie.adult && 
  
  <div className="top-2 left-2 absolute w-8 h-8 z-10   flex items-center justify-center text-xs rounded-full bg-red-600">
      <span className='  text-white'>18+</span>
</div>


}

      
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

    </div></Link>
  )
}

export default MovieCard
