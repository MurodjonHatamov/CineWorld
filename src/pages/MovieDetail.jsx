import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasicMovieDetail } from './server/api';
import { useLanguage } from './LanguageContext';
import MovieCard from '../components/MovieCard';
// Faqat React Icons ishlatildi
import { 
  FaStar, FaClock, FaCalendarAlt, FaGlobe, FaDollarSign, 
  FaPlay, FaUser, FaImage, FaComments, FaFilm, FaTags, FaQuoteLeft 
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
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      } finally {
        // Animatsiyani ko'rish uchun 1 soniya kechikish
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getMovieDetail();
  }, [id, link, language]);

  // --- SKELETON LOADING ANIMATION ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-0">
        <div className="h-[60vh] bg-white/5 animate-pulse w-full"></div>
        <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 md:w-64 aspect-[2/3] bg-white/10 rounded-2xl animate-pulse"></div>
            <div className="flex-1 space-y-4 mt-32 md:mt-40">
              <div className="h-12 bg-white/10 w-2/3 rounded animate-pulse"></div>
              <div className="h-6 bg-white/10 w-1/3 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movieData || !movieData.detail) return <div className="h-screen flex items-center justify-center text-white">Ma'lumot topilmadi.</div>;

  const { detail, cast, trailer, images, keywords, reviews, similar } = movieData;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        {/* Orqa fon gradienlari */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent z-10" />
        
        <img 
          src={detail.backdrop_path ? `${IMG_BASE}${detail.backdrop_path}` : ''} 
          className="w-full h-full object-cover opacity-50 transition-transform duration-1000 scale-105" 
          alt="backdrop" 
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-12 flex flex-col md:flex-row gap-10 items-center md:items-end">
          {/* Poster */}
          <div className="w-48 md:w-64 flex-shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden border border-white/10 transform transition hover:scale-105 duration-500">
            <img src={`${POSTER_BASE}${detail.poster_path}`} className="w-full" alt="poster" />
          </div>

          {/* Sarlavha va Qisqacha Ma'lumot */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tight drop-shadow-2xl">
              {detail.title || detail.name}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-6 text-sm md:text-lg font-medium text-gray-300">
              <span className="flex items-center gap-2 text-yellow-500"><FaStar /> {detail.vote_average?.toFixed(1)}</span>
              <span className="flex items-center gap-2 border-l border-white/20 pl-4"><FaClock /> {detail.runtime} min</span>
              <span className="flex items-center gap-2 border-l border-white/20 pl-4"><FaCalendarAlt /> {detail.release_date?.split('-')[0]}</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-widest">{detail.status}</span>
            </div>

            <p className="max-w-4xl text-gray-300 text-sm md:text-xl leading-relaxed mb-8 drop-shadow">
              {detail.overview}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {trailer && (
                <button 
                  onClick={() => setActiveTab('trailer')}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black transition shadow-lg shadow-red-600/30 active:scale-95"
                >
                  <FaPlay /> TREYLERNI KO'RISH
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex gap-8 md:gap-14 border-b border-white/10 overflow-x-auto no-scrollbar mb-12 justify-center md:justify-start">
          {[
            { id: 'cast', label: 'Aktyorlar', icon: <FaUser /> },
            { id: 'trailer', label: 'Video', icon: <FaPlay /> },
            { id: 'images', label: 'Galereya', icon: <FaImage /> },
            { id: 'reviews', label: 'Sharhlar', icon: <FaComments /> },
            { id: 'similar', label: 'O\'xshashlar', icon: <FaFilm /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="min-h-[500px]">
          
          {/* AKTYORLAR */}
          {activeTab === 'cast' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 animate-fadeIn">
              {cast?.map(person => (
                <div key={person.id} className="text-center group">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 border border-white/5 bg-[#1a1a1a]">
                    <img 
                      src={person.profile_path ? `${POSTER_BASE}${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Photo'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      alt={person.name}
                    />
                  </div>
                  <h4 className="font-bold text-sm md:text-base group-hover:text-red-500 transition">{person.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-1 italic">{person.character}</p>
                </div>
              ))}
            </div>
          )}

          {/* TREYLER */}
          {activeTab === 'trailer' && (
            <div className="max-w-5xl mx-auto aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5 animate-fadeIn">
              {trailer ? (
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Official Trailer" frameBorder="0" allowFullScreen
                />
              ) : <div className="flex items-center justify-center h-full text-gray-500 italic">Treyler topilmadi.</div>}
            </div>
          )}

          {/* RASMLAR */}
          {activeTab === 'images' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 animate-fadeIn">
              {images?.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 group">
                  <img 
                    src={`${IMG_BASE}${img.file_path}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 cursor-zoom-in" 
                    alt="movie scene" 
                  />
                </div>
              ))}
            </div>
          )}

          {/* SHARHLAR */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
              {reviews?.length > 0 ? reviews.map(review => (
                <div key={review.id} className="bg-[#141414] p-8 rounded-3xl border border-white/5 relative">
                  <FaQuoteLeft className="absolute top-6 left-6 text-white/5 text-5xl" />
                  <div className="flex items-center gap-4 mb-6 relative">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-xl">
                      {review.author[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-lg">{review.author}</h5>
                      <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed italic relative">
                    "{review.content.length > 600 ? review.content.slice(0, 600) + "..." : review.content}"
                  </p>
                </div>
              )) : <p className="text-center text-gray-500 italic py-20">Hali hech qanday sharh yozilmagan.</p>}
            </div>
          )}

          {/* O'XSHASHLAR */}
          {activeTab === 'similar' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 animate-fadeIn">
              {similar?.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. EXTRA DETAILS SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
        
        {/* Budjet va Statistika */}
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest text-red-600">Statistika</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="flex items-center gap-3 text-gray-400 text-sm font-bold"><FaDollarSign /> Budjet</span>
              <span className="text-sm font-black tracking-widest">${detail.budget?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="flex items-center gap-3 text-gray-400 text-sm font-bold"><FaGlobe /> Til</span>
              <span className="text-sm font-black uppercase tracking-widest">{detail.original_language}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="flex items-center gap-3 text-gray-400 text-sm font-bold"><FaCalendarAlt /> Sana</span>
              <span className="text-sm font-black tracking-widest">{detail.release_date}</span>
            </div>
          </div>
        </div>

        {/* Kalit So'zlar (Tags) */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest text-red-600">Kalit so'zlar</h3>
          <div className="flex flex-wrap gap-3">
            {keywords?.map(k => (
              <span key={k.id} className="px-5 py-2 bg-[#1a1a1a] hover:bg-red-600 transition-colors duration-300 rounded-xl text-[10px] md:text-xs font-bold text-gray-500 hover:text-white cursor-default border border-white/5 uppercase tracking-widest">
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