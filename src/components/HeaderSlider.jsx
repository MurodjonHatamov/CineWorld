import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import { FaStar } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchMovies } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";

const IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const FALLBACK_BG = "/imgs/img.webp"; // sening fallback

function HeaderSlider() {
  const { language } = useLanguage();
  const [slides, setSlides] = useState([]); // ✅ [''] emas

  useEffect(() => {
    fetchMovies("/trending/movie/week", language).then((data) => {
      setSlides(Array.isArray(data) ? data.slice(0, 10) : []);
    });
  }, [language]);

  if (!slides.length) return null;

  return (
    <div className="relative mt-20 rounded-2xl overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides
        loop={slides.length > 1}
        speed={1000}
        parallax
        effect="fade"
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
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        className="header-slider"
      >
        {slides.map((slide) => {
          const title = slide.title || slide.name || "Nomsiz";
          const backdrop = slide.backdrop_path
            ? `${IMAGE_ORIGINAL}${slide.backdrop_path}`
            : FALLBACK_BG;

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[500px] md:h-[550px] max-sm:h-[300px] rounded-2xl overflow-hidden group">
                {/* ✅ Background (bitta) */}
                <div
                  className="absolute inset-0 swiper-parallax-bg"
                  data-swiper-parallax="2%"
                  style={{
                    backgroundImage: `url(${backdrop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {/* overlays */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Mobile text */}
                <div className="absolute bottom-6 left-5 right-5 text-white sm:hidden">
                  <h2 className="text-2xl font-bold line-clamp-1">{title}</h2>
                  <p className="mt-2 text-sm line-clamp-2 mb-3 text-white/80">
                    {slide.overview || "Tavsif mavjud emas."}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-xl">
                      <FaStar className="text-yellow-400 text-lg" />
                      <span className="text-[15px] font-bold text-white">
                        {Math.round(slide.vote_average || 0)}
                      </span>
                      <span className="text-gray-400">/10</span>
                    </div>

                    <Link
                      to={`/movie/${slide.id}`}
                      className="px-3 py-[10px] bg-gray-900/80 backdrop-blur-sm text-white font-bold rounded-xl inline-flex items-center gap-1"
                    >
                      <span className="text-sm">Ko'proq</span>
                      <MdNavigateNext className="text-lg" />
                    </Link>
                  </div>
                </div>

                {/* Desktop content */}
                <div className="relative h-full flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
                  <div className="max-w-4xl">
                    <div
                      className="swiper-parallax max-sm:hidden"
                      data-swiper-parallax="-100"
                      data-swiper-parallax-duration="700"
                    >
                      <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        data-swiper-parallax="-200"
                      >
                        {title}
                      </h2>

                      <p
                        data-swiper-parallax="-250"
                        className="mb-4 text-white/80 max-w-2xl line-clamp-3"
                      >
                        {slide.overview || "Tavsif mavjud emas."}
                      </p>

                      <div
                        className="flex flex-wrap items-center gap-4"
                        data-swiper-parallax="-400"
                      >
                        <div className="flex items-center space-x-2 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <FaStar className="text-yellow-400 text-lg" />
                          <span className="text-2xl font-bold text-white">
                            {Math.round(slide.vote_average || 0)}
                          </span>
                          <span className="text-gray-400">/10</span>
                        </div>

                        <Link
                          to={`/movie/${slide.id}`}
                          className="group px-6 sm:px-8 py-3 bg-gray-900/70 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600 transition-all duration-300 inline-flex items-center gap-2"
                        >
                          <span className="text-sm sm:text-base">Ko'proq ma'lumot</span>
                          <MdNavigateNext className="text-lg group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Navigation */}
        <div className="swiper-button-prev overflow-hidden md:!flex !w-10 !h-10 !p-2 !bg-gray-900/70 !backdrop-blur-sm !rounded-full !left-6 !text-white hover:!bg-gray-800/70 !border !border-gray-700 after:!text-xl after:!font-bold"></div>
        <div className="swiper-button-next !hidden md:!flex !w-10 !h-10 !p-2 !bg-gray-900/70 !backdrop-blur-sm !rounded-full !right-6 !text-white hover:!bg-gray-800/70 !border !border-gray-700 after:!text-xl after:!font-bold"></div>

        <div className="swiper-pagination !bottom-6"></div>
      </Swiper>

      {/* CSS */}
     
    </div>
  );
}

export default HeaderSlider;
