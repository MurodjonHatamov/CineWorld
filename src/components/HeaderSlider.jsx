import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { FaPlay, FaStar, FaChevronLeft, FaChevronRight, FaHeart, FaPlus } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';
import { fetchMovies } from '../pages/server/api';
import { useLanguage } from '../pages/LanguageContext';

function HeaderSlider() {

  const { language } = useLanguage();
  const [slides, setSlides] = useState([''])

  useEffect(() => {
    fetchMovies("/trending/movie/week",language).then(data => setSlides(data));
  }, [language]);

  return (
    <div className="relative mt-20 rounded-2xl overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        speed={1000}
        parallax={true}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className} !w-12 !h-1 !rounded-full !bg-gray-600 hover:!bg-blue-500 !mx-1 !transition-all !duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        className="header-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
              <div 
  className="swiper-parallax-bg relative"
  data-swiper-parallax="2%"
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/original${slide.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <img 
    src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`} 
    alt={slide.title}
    className="w-full h-full object-cover object-left"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "/imgs/img.webp"; // fallback rasm
    }}
  />

  {/* Text */}
  <div className="absolute bottom-10 left-10 text-white max-w-md">
    <h2 className="text-3xl font-bold">{slide.title}</h2>
    <p className="mt-2 text-sm line-clamp-3">{slide.overview}</p>
  </div>
</div>
  
                {/* Gradient Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
               
                
                
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                  {/* Movie Info */}
                  <div 
                    className="swiper-parallax"
                    data-swiper-parallax="-100"
                    data-swiper-parallax-duration="800"
                  >
                   

                    {/* Title */}
                    <h2 
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                      data-swiper-parallax="-200"
                    >
                      {slide.title}
                    </h2>

                    {/* Description */}
                    <p 
                      className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 max-w-xl leading-relaxed"
                      data-swiper-parallax="-300"
                    >
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div 
                      className="flex flex-wrap items-center gap-4 mb-8"
                      data-swiper-parallax="-400"
                    >
                      {/* Rating */}
                      <div className="flex items-center space-x-2 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <FaStar className="text-yellow-400 text-lg" />
                        <span className="text-2xl font-bold text-white">{slide.rating}</span>
                        <span className="text-gray-400">/10</span>
                      </div>
                      <button className="group px-6 sm:px-8 py-3 bg-gray-900/70 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          
                          <span className="text-sm sm:text-base cursor-pointer">Ko'proq malumot</span>
                        
                          <MdNavigateNext className="text-lg"/>
                        </div>
                      </button>
            

                 
                    </div>

                   
                  </div>
                </div>
              </div>

    
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev  overflow-hidden md:!flex !w-10 !h-10 !p-2 !bg-gray-900/70 !backdrop-blur-sm !rounded-full !left-6 !text-white hover:!bg-gray-800/70 !border !border-gray-700 after:!text-xl after:!font-bold"></div>
        <div className="swiper-button-next !hidden md:!flex !w-10 !h-10 !p-2 !bg-gray-900/70 !backdrop-blur-sm !rounded-full !right-6 !text-white hover:!bg-gray-800/70 !border !border-gray-700 after:!text-xl after:!font-bold"></div>
        
        {/* Pagination Container */}
        <div className="swiper-pagination !bottom-6"></div>
      </Swiper>

      {/* Custom CSS */}
      <style jsx global>{`
        .header-slider {
          border-radius: 1rem;
          overflow: hidden;
        }
        
        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #3b82f6, #06b6d4) !important;
          transform: scaleY(1.5);
        }
        
       
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 10px ;
          font-weight: bold;
        }
        
        /* Fade effect improvements */
        .swiper-fade .swiper-slide {
          opacity: 0 !important;
          transition-property: opacity !important;
        }
        
        .swiper-fade .swiper-slide-active {
          opacity: 1 !important;
        }
        
        /* Parallax image animation */
        .swiper-parallax-bg {
          transition: transform 1.5s ease-out !important;
        }
        
        /* Custom scrollbar for Swiper if needed */
        .swiper-scrollbar {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .swiper-scrollbar-drag {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
          
          .swiper-pagination {
            bottom: 20px !important;
          }
        }
        
        /* Glow effect for active slide */
        .swiper-slide-active {
          position: relative;
        }
        
        .swiper-slide-active::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          border-radius: 1rem;
          z-index: 1;
          pointer-events: none;
        }
        
        /* Smooth image loading */
        .swiper-slide img {
          transition: transform 10s ease-out;
        }
        
        .swiper-slide-active img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default HeaderSlider;