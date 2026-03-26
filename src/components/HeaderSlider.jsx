import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Parallax } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { fetchMovies } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";
import { Link } from "react-router-dom";
import { MdNavigateNext, MdStar } from "react-icons/md";

const IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMG_W500 = "https://image.tmdb.org/t/p/w500";
const FALLBACK_BG = "/imgs/img.webp";

function HeaderSlider() {
  const { language } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMovies("/trending/movie/week", language).then((data) => {
      setSlides(data?.slice(0, 10) || []);
      setLoading(false);
    });
  }, [language]);

  // Yuklanish holati uchun Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6">
        <div className="w-full h-[400px] md:h-[550px] bg-white/5 animate-pulse rounded-3xl" />
      </div>
    );
  }

  if (!slides.length) return null;

  return (
    <div className="relative mt-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Swiper
        speed={1000}
        parallax={true}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, EffectFade, Parallax]}
        className="header-swiper rounded-3xl overflow-hidden shadow-2xl"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[450px] md:h-[580px] w-full group overflow-hidden">
              
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${item.backdrop_path ? IMAGE_ORIGINAL + item.backdrop_path : FALLBACK_BG})` 
                }}
                data-swiper-parallax="30%"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10" />
              <div className="relative z-20 h-full flex items-center px-8 md:px-16">
                <div className="flex w-full items-center justify-between gap-12">
                  <div className="max-w-xl">
                    <div 
                        data-swiper-parallax="-300" 
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-red-600/20"
                    >
                      <StarBadge /> Trending
                    </div>

                    <h2 
                        data-swiper-parallax="-400"
                        className="text-white font-black text-3xl sm:text-5xl md:text-6xl leading-[1.1] mb-4 drop-shadow-2xl"
                    >
                      {item.title}
                    </h2>

                    <div 
                        data-swiper-parallax="-500"
                        className="flex items-center gap-4 mb-6 text-sm md:text-base text-gray-300"
                    >
                      <span className="flex items-center gap-1 text-yellow-400 font-bold">
                        <MdStar className="text-xl" /> {item.vote_average?.toFixed(1)}
                      </span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full" />
                      <span>{item.release_date?.split("-")[0]}</span>
                      <span className="px-2 py-0.5 border border-white/20 rounded text-xs uppercase">
                        {item.original_language}
                      </span>
                    </div>

                    <p 
                        data-swiper-parallax="-600"
                        className="text-gray-300 text-sm md:text-lg leading-relaxed line-clamp-3 mb-8 max-w-lg"
                    >
                      {item.overview || "Ushbu film haqida hozircha tavsif mavjud emas."}
                    </p>

                    <div data-swiper-parallax="-700">
                      <Link
                        to={`/detail/movie/${item.id}`}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl"
                      >
                        Tomosha qilish <MdNavigateNext className="text-2xl" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Poster (Only Desktop) */}
                  <div 
                    data-swiper-parallax="-800"
                    className="hidden lg:block w-72 shrink-0 relative"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-white/30 transition-all">
                      <img
                        src={item.poster_path ? IMG_W500 + item.poster_path : FALLBACK_BG}
                        alt={item.title}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                    {/* Floating Glow Effect */}
                    <div className="absolute -inset-4 bg-red-600/10 blur-3xl -z-10 rounded-full" />
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

// Kichik yordamchi komponent
const StarBadge = () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
)

export default HeaderSlider;