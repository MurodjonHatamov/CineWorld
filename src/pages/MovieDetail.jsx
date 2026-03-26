import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasicMovieDetail } from './server/api';
import { useLanguage } from './LanguageContext';
import MovieCard from '../components/MovieCard';
// React Icons
import { 
  FaStar, FaClock, FaCalendarAlt, FaGlobe, FaDollarSign, 
  FaPlay, FaUser, FaImage, FaComments, FaFilm, FaTags 
} from 'react-icons/fa';

function MovieDetail() {
  const { link, id } = useParams();
  const { language } = useLanguage();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cast');

  const IMG_BASE = "https://image.tmdb.org/t/p/original";
  const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovieDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchBasicMovieDetail(id, link, language);
        if (data) {
          setMovieData(data);
          console.log(data);
          
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        // Animatsiyani his qilish uchun biroz kechikish (ixtiyoriy)
        setTimeout(() => setLoading(false), 800);
      }
    };
    getMovieDetail();
  }, [id, link, language]);

  // --- SKELETON ANIMATION (Yuklanish jarayoni) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
        <div className="h-[60vh] bg-white/5 w-full"></div>
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="h-10 bg-white/5 w-1/3 mb-6 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[2/3] bg-white/5 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!movieData || !movieData.detail) return <div className="h-screen flex items-center justify-center text-white">Ma'lumot topilmadi.</div>;

  const { detail, cast, trailer, images, keywords, reviews, similar } = movieData;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 font-sans">
      
      {/* 1. HERO SECTION (Banner) */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
        <img 
          src={detail.backdrop_path ? `${IMG_BASE}${detail.backdrop_path}` : ''} 
          className="w-full h-full object-cover opacity-60" 
          alt="backdrop" 
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-12 flex flex-col md:flex-row gap-8 items-center md:items-end">
          {/* Poster */}
          <div className="w-40 md:w-64 flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            <img src={`${POSTER_BASE}${detail.poster_path}`} className="w-full" alt="poster" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-6xl font-black mb-3">{detail.title || detail.name}</h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-sm text-gray-300">
              <span className="flex items-center gap-1 text-yellow-500 font-bold"><FaStar /> {detail.vote_average?.toFixed(1)}</span>
              <span className="flex items-center gap-1"><FaClock /> {detail.runtime} min</span>
              <span className="flex items-center gap-1"><FaCalendarAlt /> {detail.release_date?.split('-')[0] || detail.first_air_date?.split('-')[0]}</span>
              <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{detail.status}</span>
            </div>

            <p className="max-w-3xl text-gray-300 text-sm md:text-lg mb-6 line-clamp-3 md:line-clamp-none">
              {detail.overview}
            </p>

            {trailer && (
              <button 
                onClick={() => setActiveTab('trailer')}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-red-600/20"
              >
                <FaPlay size={12} /> TREYLERNI KO'RISH
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. TABS NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex gap-6 md:gap-12 border-b border-white/5 overflow-x-auto no-scrollbar mb-10">
          {[
            { id: 'cast', label: 'Aktyorlar', icon: <FaUser /> },
            { id: 'trailer', label: 'Treyler', icon: <FaPlay /> },
            { id: 'images', label: 'Rasmlar', icon: <FaImage /> },
            { id: 'reviews', label: 'Sharhlar', icon: <FaComments /> },
            { id: 'similar', label: 'O\'xshashlar', icon: <FaFilm /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-t-full" />}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="min-h-[400px]">
          
          {/* CAST */}
          {activeTab === 'cast' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {cast?.map(person => (
                <div key={person.id} className="text-center group">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-3 border border-white/5">
                    <img 
                      src={person.profile_path ? `${POSTER_BASE}${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Photo'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      alt={person.name}
                    />
                  </div>
                  <h4 className="font-bold text-sm truncate">{person.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase mt-1">{person.character}</p>
                </div>
              ))}
            </div>
          )}

          {/* TRAILER */}
          {activeTab === 'trailer' && (
            <div className="max-w-5xl mx-auto aspect-video w-full rounded-2xl overflow-hidden bg-black">
              {trailer ? (
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Trailer" frameBorder="0" allowFullScreen
                />
              ) : <div className="flex items-center justify-center h-full">Video topilmadi</div>}
            </div>
          )}

          {/* IMAGES */}
          {activeTab === 'images' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images?.map((img, i) => (
                <img 
                  key={i} src={`${IMG_BASE}${img.file_path}`} 
                  className="rounded-xl border border-white/5 hover:opacity-80 transition" 
                  alt="scene" 
                />
              ))}
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews?.length > 0 ? reviews.map(review => (
                <div key={review.id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-red-500 mb-2">@{review.author}</h5>
                  <p className="text-gray-400 text-sm leading-relaxed">"{review.content.slice(0, 500)}..."</p>
                </div>
              )) : <p className="text-center text-gray-500 italic py-10">Sharhlar hali yo'q.</p>}
            </div>
          )}

          {/* SIMILAR */}
          {activeTab === 'similar' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similar?.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. EXTRA INFO (Budget, Keywords) */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-white/5">
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><FaGlobe className="text-red-600"/> Ma'lumotlar</h3>
          <div className="text-sm text-gray-400 flex justify-between border-b border-white/5 pb-2">
            <span>Budjet:</span> <span className="text-white">${detail.budget?.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-400 flex justify-between border-b border-white/5 pb-2">
            <span>Asl til:</span> <span className="text-white uppercase">{detail.original_language}</span>
          </div>
          <div className="text-sm text-gray-400 flex justify-between border-b border-white/5 pb-2">
            <span>Davomiyligi:</span> <span className="text-white">{detail.runtime} min</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><FaTags className="text-red-600"/> Kalit so'zlar</h3>
          <div className="flex flex-wrap gap-2">
            {keywords?.map(k => (
              <span key={k.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-gray-400 hover:text-white hover:bg-red-600 transition cursor-default">
                #{k.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;