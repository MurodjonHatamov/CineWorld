import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

import { fetchMovies } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const FALLBACK_BG = "/imgs/img.webp"; // sening fallback
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
function HeaderSlider() {
  const { language } = useLanguage();
  const [slides, setSlides] = useState([]); // ✅ [''] emas


  useEffect(() => {
    fetchMovies("/trending/movie/week", language).then((data) => {
      setSlides(data);
    });
  }, [language]);

  if (!slides?.length) return null;

  return (
    <div className="relative mt-20 rounded-2xl overflow-hidden">

<div className="max-w-7xl m-auto">
{
  slides ? <Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
        clickable: true,

    dynamicBullets: true,
  }} modules={[Pagination]}
  className="mySwiper"
>
{slides ? slides.map((item) => (
<SwiperSlide key={item.id}>
<div className="relative h-[420px] md:h-[520px] cursor-grabbing max-sm:h-[250px]
">
          {/* background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.backdrop_path ? `${IMAGE_ORIGINAL}${item.backdrop_path}` : FALLBACK_BG})` }}
          />
          <div className="absolute inset-0 bg-black/5   sm:bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* content */}
          <div className="relative h-full px-4 sm:px-8 md:px-12 flex items-center">
            <div className="  pl-6 w-full flex items-center gap-6 md:gap-10">
              {/* left text */}
              <div className="flex-1 max-w-2xl">
                

                <h2 className="    text-white font-extrabold text-2xl sm:text-4xl md:text-5xl
leading-tight line-clamp-2
animate-slideDown">
                  {item.title}
                </h2>

                <p className="text-white/75 mt-3 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {item.overview || "Tavsif mavjud emas."}
                </p>

                <div className="mt-6">
                  <Link
                    to={`/movie/${item.id}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition active:scale-[0.98] max-sm:px-4 max-sm:py-2 max-sm:text-sm"
                  >
                    Ko'proq ma'lumot <MdNavigateNext className="text-lg" />
                  </Link>
                </div>
              </div>

              {/* right poster */}
              <div className="hidden md:block w-72 shrink-0">
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <img
                    src={item.poster_path ? IMG_BASE + item.poster_path : FALLBACK_BG}
                    alt={item.title}
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_POSTER;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
</SwiperSlide>
)) : (<div class="flex animate-pulse space-x-4">
<div class="w-[210px] h-[270px]  bg-white/10 rounded-lg"></div>

</div>)
}

</Swiper> :
<div class="flex animate-pulse space-x-4">
      <div class="w-[210px] h-[270px]  bg-white/10 rounded-lg"></div>
   
    </div>
}
</div>
    </div>
  );
}

export default HeaderSlider;
