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
              640: { slidesPerView: 2, spaceBetween: 18 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={850}
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
  </>:       <div className="px-4 sm:px-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
            <h2 className="text-white font-semibold">
              {title} hozircha topilmadi
            </h2>
            <p className="text-white/60 text-sm mt-2">
              Barchasini ko‘rish uchun <span className="text-white">Batafsil</span> tugmasini bosing.
            </p>
          </div>
        </div>
}
      {/* Swiper with ref */}

    </div>
  )
}

export default SwiperCard