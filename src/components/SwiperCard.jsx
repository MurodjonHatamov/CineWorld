import React from 'react'
import MovieCard from '../components/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { MdNavigateNext, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

function SwiperCard({title,movies,type,sectionId}) {




  const swiperRef = React.useRef(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="mb-20 ">
      {/* Glass header */}
      <div className="mb-8 px-6">
        <div className="flex items-center justify-between ">
          <div>
          
            <h2 className='text-2xl font-bold text-white'>
           {title}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700   cursor-pointer"
              >
                <MdOutlineKeyboardArrowLeft className="text-2xl" />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700   cursor-pointer"
              >
                <MdOutlineKeyboardArrowRight className="text-2xl" />
              </button>
            </div>
            
            <button className='group flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 backdrop-blur-sm rounded-xl sm:textBtn '>
              <Link to={`/section/${type}/${sectionId}`} className='flex items-center gap-2 text-base font-medium '>
                Batafsil
                <MdNavigateNext className="text-xl transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </button>
          </div>
        </div>
      </div>


{
  movies.length > 0 ? <>
        <Swiper
            ref={swiperRef}
            spaceBetween={16}  /* Mobile uchun kichikroq oralik */
            loop={movies.length > 4}  /* Faqat 4+ film bo'lsa loop qil */
            slidesPerView={2}  /* Mobile: 2 ta */
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: { 
                slidesPerView: 4,
                spaceBetween: 24
              },
              1280: { 
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay]}
        className="swiper-glass"
      >
        {movies.map(movie => (
  <SwiperSlide key={movie.id} className="pb-2">
    <div className="px-2">
      <MovieCard movie={movie} />
    </div>
  </SwiperSlide>
))}

      </Swiper>
  </>: <div className=" bg-gray-800 p-3 rounded-2xl">
  <h2 className='text-white text-center text-1xl'>Barcha  {title+"ni"} ko'rmoqchi bolsengiz Batafsil tugmasini bosing</h2>
  </div>
}
      {/* Swiper with ref */}

    </div>
  )
}

export default SwiperCard