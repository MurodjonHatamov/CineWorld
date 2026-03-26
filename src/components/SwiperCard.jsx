import React from 'react'
import MovieCard from '../components/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { MdNavigateNext, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';


function SwiperCard({ title, movies = [], type, sectionId, isLoading }) {
  const swiperRef = React.useRef(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };


  const hasMovies = Array.isArray(movies) && movies.length > 0;

  const showSkeleton = isLoading || !hasMovies;

  const shouldLoop = movies.length >= 6;

  return (
    <div className="mb-20 max-sm:mb-8 ">
      {/* Header qismi */}
      <div className="mb-8 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className='text-2xl font-extrabold text-white max-sm:text-[16px]'>
              {title}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
  
            {!showSkeleton && (
              <div className="flex items-center gap-2 hidden sm:flex">
                <button onClick={handlePrev} className="iconBtn">
                  <MdOutlineKeyboardArrowLeft className="text-xl" />
                </button>
                <button onClick={handleNext} className="iconBtn">
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </button>
              </div>
            )}
            
            <Link to={`/section/${type}/${sectionId}`} className="button" title="Batafsil">
              Batafsil
              <MdNavigateNext className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

 
      {!showSkeleton ? (
        <Swiper
          ref={swiperRef}
          spaceBetween={14}
          loop={shouldLoop}
          slidesPerView={2}
             
                
                
                          watchSlidesProgress={true}

          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20,speed: 500, },
            768: { slidesPerView: 3, spaceBetween: 20,  speed: 500, },
            1024: { slidesPerView: 6, spaceBetween: 30,  speed: 500, },
            1280: { slidesPerView: 6, spaceBetween: 30,  speed: 500, },
          }}
          modules={[Autoplay]}
          className="swiper-glass px-6"
        >
          {movies.map(movie => (
            <SwiperSlide key={movie.id} className="pb-2">
              <div className="px-2">
                <MovieCard movie={movie} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
    
        <div className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex flex-col animate-pulse">
              
              <div className="w-full aspect-[2/3] bg-white/10 rounded-xl mb-3"></div>
            
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SwiperCard;