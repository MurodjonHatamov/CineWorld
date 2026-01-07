import React, { useState } from 'react';
import { FaPlay, FaStar, FaHeart, FaBookmark, FaShare, FaCalendarAlt, FaClock, FaLanguage, FaUserFriends, FaVolumeUp, FaPlus, FaChevronLeft } from 'react-icons/fa';
import { MdLocalMovies, MdOutlineSubtitles, MdHighQuality } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function MovieDetail() {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  // Film ma'lumotlari
  const movie = {
    title: "Dune: Ikkinchi qism",
    originalTitle: "Dune: Part Two",
    year: 2024,
    duration: "2h 46m",
    rating: 9.0,
    imdbRating: 8.9,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    language: "English",
    subtitles: ["O'zbekcha", "Русский", "English"],
    quality: "4K Ultra HD",
    ageRating: "PG-13",
    description: "Paul Atreides joins forces with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he must prevent a terrible future only he can foresee.",
    longDescription: "Dune: Part Two explores the mythic journey of Paul Atreides as he unites with Chani and the Fremen on a warpath of revenge against the conspirators who destroyed his family. Faced with a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    trailer: "https://www.youtube.com/embed/Way9Dexny3w",
    similarMovies: [
      { id: 1, title: "Interstellar", year: 2014, rating: 8.6 },
      { id: 2, title: "Blade Runner 2049", year: 2017, rating: 8.0 },
      { id: 3, title: "Avatar: The Way of Water", year: 2022, rating: 7.6 },
      { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
    ]
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black'>
      {/* Orqaga qaytish tugmasi */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-gray-800/70 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700/70 transition-all duration-300"
      >
        <FaChevronLeft />
        <span>Orqaga</span>
      </button>

      {/* Hero section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-xl font-bold">{movie.rating}</div>
                    <div className="text-xs">/10</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie info */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full">
                  PREMIERE
                </span>
                <span className="px-4 py-1.5 bg-gray-800 text-gray-200 text-sm rounded-full border border-gray-700">
                  {movie.quality}
                </span>
                <span className="px-4 py-1.5 bg-gray-800 text-gray-200 text-sm rounded-full border border-gray-700">
                  {movie.ageRating}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {movie.title}
                <span className="block text-2xl md:text-3xl text-gray-400 mt-2">
                  {movie.originalTitle} ({movie.year})
                </span>
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="text-2xl font-bold text-white">{movie.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span className="text-gray-300">{movie.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-cyan-400" />
                  <span className="text-gray-300">{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLanguage className="text-green-400" />
                  <span className="text-gray-300">{movie.language}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mb-8">
                {movie.genres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-200 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <FaPlay className="text-lg" />
                    <span className="text-lg">Hozir Ko'rish</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </button>

                <button className="group flex items-center gap-2 px-6 py-3 bg-gray-800/70 backdrop-blur-sm text-white rounded-xl hover:bg-gray-700/70 border border-gray-700 transition-all duration-300">
                  <FaPlay />
                  <span>Treylerni Ko'rish</span>
                </button>

                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-gray-800/70 text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-gray-700'
                  }`}
                >
                  <FaHeart />
                </button>

                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isBookmarked 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-gray-800/70 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 border border-gray-700'
                  }`}
                >
                  <FaBookmark />
                </button>

                <button className="w-12 h-12 rounded-full bg-gray-800/70 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/70 border border-gray-700 transition-all duration-300">
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          {[
            { id: 'about', label: 'Film haqida' },
            { id: 'cast', label: 'Aktyorlar' },
            { id: 'reviews', label: 'Sharhlar' },
            { id: 'similar', label: 'O\'xshash filmlar' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Tavsif</h2>
                <p className="text-gray-300 leading-relaxed">{movie.longDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Texnik ma'lumotlar</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Sifat</span>
                        <span className="text-white flex items-center gap-2">
                          <MdHighQuality /> {movie.quality}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Audio</span>
                        <span className="text-white flex items-center gap-2">
                          <FaVolumeUp /> Dolby Atmos
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400">Subtitrlar</span>
                        <span className="text-white flex items-center gap-2">
                          <MdOutlineSubtitles /> {movie.subtitles.length} til
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Reytinglar</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">IMDB</span>
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          <span className="text-white font-bold">{movie.imdbRating}</span>
                          <span className="text-gray-400">/10</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">CineWorld</span>
                        <div className="flex items-center gap-2">
                          <FaStar className="text-blue-400" />
                          <span className="text-white font-bold">{movie.rating}</span>
                          <span className="text-gray-400">/10</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Ko'rishlar</span>
                        <span className="text-white">2.4M+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Aktyorlar va jamoa</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="group">
                      <div className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center mb-3 mx-auto">
                          <FaUserFriends className="text-blue-400 text-2xl" />
                        </div>
                        <h4 className="text-white text-center font-medium">{actor}</h4>
                        <p className="text-gray-400 text-center text-sm mt-1">Aktyor</p>
                      </div>
                    </div>
                  ))}
                  <div className="group">
                    <div className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center mb-3 mx-auto">
                        <MdLocalMovies className="text-cyan-400 text-2xl" />
                      </div>
                      <h4 className="text-white text-center font-medium">{movie.director}</h4>
                      <p className="text-gray-400 text-center text-sm mt-1">Rejissor</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">O'xshash filmlar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.similarMovies.map((similar) => (
                    <div key={similar.id} className="group bg-gray-800/30 rounded-xl p-4 hover:bg-gray-700/30 transition-all duration-300 border border-gray-800 hover:border-blue-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium group-hover:text-blue-300">{similar.title}</h4>
                          <p className="text-gray-400 text-sm">{similar.year}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          <span className="text-white font-bold">{similar.rating}</span>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors text-sm">
                        Ko'rish
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Director info */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">Rejissor</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                  <MdLocalMovies className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{movie.director}</h4>
                  <p className="text-gray-400 text-sm">Denis Villeneuve</p>
                </div>
              </div>
            </div>

            {/* Subtitles */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">Subtitrlar</h3>
              <div className="space-y-2">
                {movie.subtitles.map((sub, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                    <span className="text-gray-300">{sub}</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Yoqish</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-4">Tezkor amallar</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/30">
                  <FaPlus /> Ro'yxatga qo'shish
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                  <FaShare /> Ulashish
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                  <FaBookmark /> Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Tab content animations */
        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Smooth hover effects */
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
      `}</style>
    </div>
  );
}

export default MovieDetail;