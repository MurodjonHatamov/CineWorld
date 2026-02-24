import React from 'react'
import MovieCard from '../components/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { MdNavigateNext, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

function SwiperCard({title,movies=[],type,sectionId}) {




  const swiperRef = React.useRef(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const hasMovies= Array.isArray(movies) && movies.length > 0;

  // Katta ekranda 4 ta ko‘rinadi, loop uchun kamida 6 bo‘lsa yaxshi (clones muammo bermaydi)
  const shouldLoop = movies.length >= 6;


  return (
    <div className="mb-20 max-sm:mb-8 ">
      {/* Glass header */}
      <div className="mb-8 px-6">
        <div className="flex items-center justify-between  ">
          <div>
          
            <h2 className='text-2xl font-extrabold text-white max-sm:text-[16px]'>
           {title}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 hidden sm:flex">
              <button 
                onClick={handlePrev}
                className="iconBtn"
              >
                <MdOutlineKeyboardArrowLeft className="text-xl" />
              </button>
              <button 
                onClick={handleNext}
                className="iconBtn"
              >
                <MdOutlineKeyboardArrowRight className="text-xl" />
              </button>
            </div>
            
            <Link
              to={`/section/${type}/${sectionId}`}
              className="
            button
              "
              title="Batafsil"
            >
              Batafsil
              <MdNavigateNext className="text-xl" />
            </Link>
          </div>
        </div>
      </div>


{
  hasMovies ? <>
        <Swiper
            ref={swiperRef}
            
            spaceBetween={14}  
            loop={shouldLoop} 
            slidesPerView={2}
            
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30,centeredSlides: false },
              768: { slidesPerView: 3, spaceBetween: 20 ,centeredSlides: true},
              1024: { slidesPerView: 6, spaceBetween: 30,centeredSlides: true },
              1280: { slidesPerView: 6, spaceBetween: 30,centeredSlides: true },
            }}
   
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
  </>:     <div className=" rounded-md  p-4 flex items-center justify-center gap-3 overflow-hidden">
  {
    [1,2,3,4,5].map((item)=>{
      return <div className="flex animate-pulse space-x-4">
      <div className="w-[210px] h-[270px]  bg-white/10 rounded-lg"></div>
   
    </div>
    })
  }
</div>
}
      {/* Swiper with ref */}

    </div>
  )
}

export default SwiperCard