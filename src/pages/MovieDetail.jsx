import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasicMovieDetail } from '../pages/server/api';
import { FaStar, FaPlay, FaCalendarAlt, FaClock, FaHeart, FaBookmark, FaShare } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import MovieCard from '../components/MovieCard';
import { IoEarthOutline } from 'react-icons/io5';
import { MdOutlinePlayCircle } from 'react-icons/md';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const IMAGE_SMALL = 'https://image.tmdb.org/t/p/w185';

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBasicMovieDetail(id)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Film topilmadi</h2>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const { detail, cast, trailer, similar } = data;

  // Format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* HERO SECTION */}
      <div
        className="relative h-[80vh] bg-cover bg-top"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${detail.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent"></div>

        <div className="relative h-full flex items-center p-4 md:p-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-[30px]">
              {/* Poster */}
              <div className="w-48 md:w-64 flex-shrink-0">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                  alt={detail.title}
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1">
                <h2 className='text-3xl md:text-5xl font-bold mb-3'>
                  {detail.title}
                  {detail.adult && (
                    <span className="ml-3 text-sm bg-red-600 px-2 py-1 rounded align-middle">
                      18+
                    </span>
                  )}
                </h2>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {detail.genres?.map(genre => (
                    <span key={genre.id} className="px-3 py-1 bg-gray-800/90 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-2xl font-bold">{detail.vote_average?.toFixed(1)}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>{detail.release_date?.split('-')[0]}</span>
                  </div>

                  {detail.runtime && (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-400" />
                      <span>{formatRuntime(detail.runtime)}</span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {/* Trailer button */}
                  <button 
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <MdOutlinePlayCircle className="text-xl" />
                    <span>Treyler</span>
                  </button>

                  {/* Watch movie button */}
                  {detail.homepage && (
                    <a
                      href={detail.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      Kinoga o'tish
                      <IoIosArrowForward />
                    </a>
                  )}

                  {/* Like button */}
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-xl ${isLiked ? 'bg-red-600' : 'bg-gray-800/50'} hover:bg-gray-700/50 transition-colors`}
                    title={isLiked ? "Yoqmaydi" : "Yoqadi"}
                  >
                    <FaHeart className={isLiked ? 'text-white' : 'text-gray-400'} />
                  </button>

                  {/* Bookmark button */}
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-xl ${isBookmarked ? 'bg-blue-600' : 'bg-gray-800/50'} hover:bg-gray-700/50 transition-colors`}
                    title={isBookmarked ? "Saqlangan" : "Saqlash"}
                  >
                    <FaBookmark className={isBookmarked ? 'text-white' : 'text-gray-400'} />
                  </button>

                  {/* Share button */}
                  <button 
                    className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    title="Ulashish"
                  >
                    <FaShare className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAST SECTION */}
      <section className="py-8 px-4 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Aktyorlar</h2>
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {cast.map(actor => (
            <div 
              key={actor.id} 
              className="flex-shrink-0 text-center group cursor-pointer"
              title={`${actor.name} as ${actor.character}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-colors">
                <img
                  src={
                    actor.profile_path
                      ? `${IMAGE_SMALL}${actor.profile_path}`
                      : 'https://via.placeholder.com/100x100?text=No+Image'
                  }
                  alt={actor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-medium mt-2 truncate w-20 md:w-24">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate w-20 md:w-24">{actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOVIE DETAILS SECTION */}
      <section className="py-8 px-4 md:px-10 max-w-6xl mx-auto bg-gray-900/50 rounded-2xl my-8">
        <div className="space-y-6">
          {/* Title and tagline */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{detail.title}</h2>
            {detail.tagline && (
              <p className="italic text-gray-400 text-lg">"{detail.tagline}"</p>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> 
              {detail.vote_average.toFixed(1)} ({detail.vote_count} ovoz)
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-green-400" /> 
              {formatRuntime(detail.runtime)}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-400" /> 
              {detail.release_date}
            </span>
            {detail.origin_country?.length > 0 && (
              <span className="flex items-center gap-1">
                <IoEarthOutline className="text-green-500" /> 
                {detail.origin_country.join(', ')}
              </span>
            )}
            <span className={detail.adult ? 'text-red-400' : 'text-green-400'}>
              {detail.adult ? '🔞 18+' : '👨‍👩‍👧‍👦 Family'}
            </span>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Tavsif</h3>
            <p className="text-gray-300 leading-relaxed">{detail.overview}</p>
          </div>

          {/* Production info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages */}
            {detail.spoken_languages?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Tillar</h4>
                <div className="flex flex-wrap gap-2">
                  {detail.spoken_languages.map((lang) => (
                    <span
                      key={lang.iso_639_1}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Production companies */}
            {detail.production_companies?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Prodakshn kompaniyalar</h4>
                <div className="flex flex-wrap gap-2">
                  {detail.production_companies.map((company) => (
                    <span
                      key={company.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/30 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Byudjet</p>
              <p className="font-bold text-lg">{formatCurrency(detail.budget)}</p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Daromad</p>
              <p className="font-bold text-lg">{formatCurrency(detail.revenue)}</p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Holati</p>
              <p className="font-bold text-lg">{detail.status}</p>
            </div>
            {detail.imdb_id && (
              <div className="bg-gray-800/30 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">IMDb</p>
                <a
                  href={`https://www.imdb.com/title/${detail.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  IMDb sahifasi
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SIMILAR MOVIES SECTION */}
      {similar?.length > 0 && (
        <section className="py-8 px-4 md:px-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">O'xshash Filmlar</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Barchasini ko'rish →
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {similar.map(movie => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TRAILER MODAL */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 p-2"
            >
              ✕
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default MovieDetail;