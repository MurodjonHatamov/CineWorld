import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaShare,
  FaExternalLinkAlt,
  FaFilm,
  FaLanguage,
  FaLink,
  FaMoneyBillWave,
  FaPlay,
  FaImages,
  FaTags,
  FaTv,
  FaUsers,
  FaHeart,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaYoutube,
  FaVimeo,
  FaImdb,
  FaFacebook,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";
import { IoEarthOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlinePlayCircle, MdPerson } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";

// API konfiguratsiyasi
const API_KEY ='87ea6600c90ed06f2a15fff32ae9ac23';
const BASE_URL = 'https://api.themoviedb.org/3';

// Rasim URL manbalari
const IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMAGE_W500 = "https://image.tmdb.org/t/p/w500";
const IMAGE_W342 = "https://image.tmdb.org/t/p/w342";
const IMAGE_W300 = "https://image.tmdb.org/t/p/w300";
const IMAGE_W185 = "https://image.tmdb.org/t/p/w185";
const IMAGE_W154 = "https://image.tmdb.org/t/p/w154";
const IMAGE_W92 = "https://image.tmdb.org/t/p/w92";

// Fallback rasimlar
const FALLBACK_BACKDROP = "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=No+Image";
const FALLBACK_POSTER = "https://via.placeholder.com/500x750/1a1a1a/ffffff?text=No+Poster";
const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=1a1a1a&color=fff&name=";
const FALLBACK_LOGO = "https://via.placeholder.com/92x92/1a1a1a/ffffff?text=Logo";

// ==================== API FUNCTIONS ====================
const fetchFullDetail = async (id, type = 'movie', language = 'en-US') => {
  try {
    const endpoints = {
      movie: [
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/keywords?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/external_ids?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`,
        `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
      ],
      tv: [
        `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/tv/${id}/aggregate_credits?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=${language}`,
        `${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/keywords?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/external_ids?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/content_ratings?api_key=${API_KEY}`,
        `${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`
      ]
    };

    const responses = await Promise.all(endpoints[type].map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));

    return {
      type,
      detail: data[0],
      credits: data[1],
      videos: data[2],
      similar: data[3],
      recommendations: data[4],
      images: data[5],
      keywords: data[6],
      externalIds: data[7],
      ratings: data[8],
      providers: data[9]
    };
  } catch (error) {
    console.error('Error fetching full detail:', error);
    throw error;
  }
};

// ==================== UTILITY FUNCTIONS ====================
const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatCurrency = (amount) => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// ==================== REUSABLE COMPONENTS ====================

// 1. Loading Skeleton
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-black text-white">
    <div className="h-[60vh] bg-gray-800 animate-pulse" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-40 md:w-72 lg:w-80 shrink-0">
          <div className="aspect-[2/3] bg-gray-800 rounded-2xl" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-1/2" />
          <div className="h-6 bg-gray-800 rounded w-1/4" />
          <div className="flex gap-2">
            <div className="h-10 bg-gray-800 rounded w-24" />
            <div className="h-10 bg-gray-800 rounded w-24" />
            <div className="h-10 bg-gray-800 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 2. Error Component
const ErrorComponent = ({ message, onRetry }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">😔</div>
      <h2 className="text-2xl font-bold mb-3">Xatolik yuz berdi</h2>
      <p className="text-white/70 mb-6">{message}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Orqaga
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition font-semibold"
          >
            Qayta urinish
          </button>
        )}
      </div>
    </div>
  </div>
);

// 3. Backdrop Image Component
const BackdropImage = ({ src, alt, className = "" }) => (
  <div
    className={`bg-cover bg-center ${className}`}
    style={{ 
      backgroundImage: `url(${src}), url(${FALLBACK_BACKDROP})`,
      backgroundBlendMode: 'overlay'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
  </div>
);

// 4. Poster Image Component
const PosterImage = ({ src, alt, className = "", onClick }) => (
  <div className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`} onClick={onClick}>
    <img
      src={src || FALLBACK_POSTER}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
      onError={(e) => {
        e.target.src = FALLBACK_POSTER;
      }}
    />
    <div className="absolute inset-0 ring-1 ring-white/10 hover:ring-white/20 transition" />
  </div>
);

// 5. Actor Card Component
const ActorCard = ({ actor, onClick }) => (
  <div 
    className="group cursor-pointer text-center"
    onClick={() => onClick?.(actor)}
  >
    <div className="relative aspect-square rounded-xl overflow-hidden mb-3 ring-1 ring-white/10 group-hover:ring-white/30 transition">
      <img
        src={actor.profile_path ? `${IMAGE_W185}${actor.profile_path}` : `${FALLBACK_AVATAR}${actor.name}`}
        alt={actor.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="font-semibold text-sm line-clamp-1 group-hover:text-white/90">
      {actor.name}
    </p>
    <p className="text-xs text-white/60 line-clamp-2">
      {actor.character || actor.roles?.[0]?.character}
    </p>
  </div>
);

// 6. Video Card Component
const VideoCard = ({ video }) => (
  <div className="space-y-3">
    <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/50 relative group">
      {video.site === 'YouTube' ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.key}`}
          className="w-full h-full"
          allowFullScreen
          title={video.name}
        />
      ) : video.site === 'Vimeo' ? (
        <iframe
          src={`https://player.vimeo.com/video/${video.key}`}
          className="w-full h-full"
          allowFullScreen
          title={video.name}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white/60">Video preview not available</p>
        </div>
      )}
      <div className="absolute bottom-2 left-2">
        {video.site === 'YouTube' ? (
          <FaYoutube className="text-red-600 text-lg" />
        ) : video.site === 'Vimeo' ? (
          <FaVimeo className="text-blue-500 text-lg" />
        ) : null}
      </div>
    </div>
    <div className="space-y-1">
      <p className="font-semibold line-clamp-1">{video.name}</p>
      <div className="flex items-center gap-3 text-sm text-white/60">
        <span>{video.type}</span>
        <span>•</span>
        <span>{video.size}p</span>
      </div>
    </div>
  </div>
);

// 7. Movie Card Component
const MovieCard = ({ movie, type = 'movie' }) => {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  const poster = movie.poster_path 
    ? `${IMAGE_W342}${movie.poster_path}`
    : FALLBACK_POSTER;

  return (
    <Link 
      to={`/${type}/${movie.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="font-bold text-xs">{rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
                <FaCalendarAlt className="text-xs" />
                <span className="text-xs">{year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-white/90">
        {title}
      </h3>
      <p className="text-xs text-white/60">
        {movie.media_type === 'tv' ? 'TV Series' : 'Movie'}
      </p>
    </Link>
  );
};

// 8. Company Card Component
const CompanyCard = ({ company }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
      {company.logo_path ? (
        <img
          src={`${IMAGE_W92}${company.logo_path}`}
          alt={company.name}
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <FaFilm className="text-xl text-white/40" />
      )}
    </div>
    <div className="min-w-0">
      <p className="font-semibold text-sm line-clamp-1">{company.name}</p>
      <p className="text-xs text-white/60">{company.origin_country || "—"}</p>
    </div>
  </div>
);

// 9. Trailer Modal Component
const TrailerModal = ({ video, onClose }) => {
  if (!video?.key) return null;

  const videoSrc = video.site === 'YouTube' 
    ? `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1`
    : video.site === 'Vimeo'
    ? `https://player.vimeo.com/video/${video.key}?autoplay=1`
    : null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl p-2 z-10"
        >
          <FaTimes />
        </button>
        <div className="aspect-video rounded-2xl overflow-hidden ring-2 ring-white/20 bg-black">
          {videoSrc ? (
            <iframe
              src={videoSrc}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/60">This video cannot be played</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="font-semibold text-lg">{video.name}</p>
          <p className="text-white/60 text-sm">
            {video.type} • {video.site} • {video.size}p
          </p>
        </div>
      </div>
    </div>
  );
};

// 10. Image Gallery Modal Component
const ImageGalleryModal = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const allImages = [...(images.backdrops || []), ...(images.posters || [])];

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (allImages.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-3xl p-2 bg-black/50 rounded-full"
      >
        <FaTimes />
      </button>

      <div className="h-full flex">
        {/* Thumbnails sidebar */}
        <div className="hidden md:block w-48 overflow-y-auto p-4 bg-black/50">
          <div className="space-y-2">
            {allImages.map((img, idx) => (
              <img
                key={img.file_path}
                src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
                alt={`Image ${idx + 1}`}
                className={`w-full cursor-pointer rounded transition ${
                  currentIndex === idx
                    ? 'ring-2 ring-white'
                    : 'opacity-50 hover:opacity-100'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Main image */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition z-10"
          >
            <FaChevronLeft className="text-2xl" />
          </button>

          <div className="max-w-full max-h-full">
            <img
              src={`https://image.tmdb.org/t/p/original${allImages[currentIndex].file_path}`}
              alt="Gallery"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white/60">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition z-10"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showMoreCast, setShowMoreCast] = useState(12);
  const [showMoreSimilar, setShowMoreSimilar] = useState(8);
  const [activeTab, setActiveTab] = useState('overview');

  // Type aniqlash
  const type = useMemo(() => {
    if (location.pathname.includes('/tv/')) return 'tv';
    if (location.pathname.includes('/movie/')) return 'movie';
    return 'movie';
  }, [location.pathname]);

  // Ma'lumotlarni yuklash
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFullDetail(id, type);
      setData(result);
    } catch (err) {
      setError(err.message || 'Ma\'lumotlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadData();
  }, [loadData]);

  // Formatlash funksiyalari
  const formatEpisodeRuntime = useCallback((runtimes) => {
    if (!runtimes || runtimes.length === 0) return "N/A";
    const avg = runtimes.reduce((a, b) => a + b, 0) / runtimes.length;
    return `${Math.round(avg)} min`;
  }, []);

  const copyShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link nusxalandi ✅");
    } catch {
      prompt("Linkni nusxalab oling:", window.location.href);
    }
  }, []);

  // Helper funksiyalari
  const getTitle = useCallback(() => {
    if (!data?.detail) return "N/A";
    return data.detail.title || data.detail.name || data.detail.original_title;
  }, [data]);

  const getYear = useCallback(() => {
    if (!data?.detail) return "—";
    const date = data.detail.release_date || data.detail.first_air_date;
    return date ? date.split("-")[0] : "—";
  }, [data]);

  const getRating = useCallback(() => {
    if (!data?.detail?.vote_average) return "—";
    return data.detail.vote_average.toFixed(1);
  }, [data]);

  const getTrailer = useCallback(() => {
    if (!data?.videos?.results) return null;
    return data.videos.results.find(v => 
      v.type === 'Trailer' && v.site === 'YouTube'
    ) || data.videos.results[0];
  }, [data]);

  // Loading holati
  if (loading) return <LoadingSkeleton />;
  
  // Xatolik holati
  if (error) return <ErrorComponent message={error} onRetry={loadData} />;
  
  // Ma'lumot yo'q holati
  if (!data) return <ErrorComponent message="Ma'lumot topilmadi" />;

  const { 
    detail, 
    credits, 
    videos, 
    similar, 
    recommendations, 
    images, 
    keywords, 
    externalIds,
    ratings,
    providers 
  } = data;

  const title = getTitle();
  const year = getYear();
  const rating = getRating();
  const trailer = getTrailer();
  const isTV = type === 'tv';

  const backdrop = detail?.backdrop_path
    ? `${IMAGE_ORIGINAL}${detail.backdrop_path}`
    : FALLBACK_BACKDROP;

  const poster = detail?.poster_path
    ? `${IMAGE_W500}${detail.poster_path}`
    : FALLBACK_POSTER;

  // Tab konfiguratsiyasi
  const tabs = [
    { id: 'overview', label: 'Tavsif', icon: '📝', show: true },
    { id: 'cast', label: 'Aktyorlar', icon: '👥', show: true },
    { id: 'media', label: 'Media', icon: '🎬', show: videos?.results?.length > 0 },
    { id: 'seasons', label: 'Sezonlar', icon: '📺', show: isTV && detail?.seasons?.length > 0 },
    { id: 'details', label: 'Batafsil', icon: '🔍', show: true }
  ].filter(tab => tab.show);

  // Cast ma'lumotlari
  const cast = isTV ? credits?.cast || [] : credits?.cast || [];
  const crew = isTV ? credits?.crew || [] : credits?.crew || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ========== HERO SECTION ========== */}
      <div className="relative">
        <BackdropImage 
          src={backdrop}
          alt={title}
          className="h-[60vh] md:h-[70vh]"
        />

        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-end pb-8 md:pb-12">
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Poster */}
              <div className="w-32 md:w-48 lg:w-56 shrink-0">
                <PosterImage src={poster} alt={title} />
              </div>

              {/* Info */}
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-lg bg-white/20 text-sm font-medium">
                    {isTV ? 'TV Series' : 'Movie'}
                  </span>
                  {detail?.adult && (
                    <span className="px-3 py-1.5 rounded-lg bg-red-600/90 text-sm font-medium">
                      18+
                    </span>
                  )}
                  {detail?.status && (
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      detail.status === 'Released' ? 'bg-green-600' :
                      detail.status === 'In Production' ? 'bg-yellow-600' :
                      detail.status === 'Ended' ? 'bg-red-600' :
                      'bg-gray-600'
                    }`}>
                      {detail.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                  {title}
                </h1>

                {/* Tagline */}
                {detail?.tagline && (
                  <p className="text-lg text-white/80 italic mb-4">
                    "{detail.tagline}"
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold">{rating}</span>
                    <span className="text-white/60">
                      /10 ({detail?.vote_count?.toLocaleString() || 0})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{year}</span>
                  </div>
                  
                  {!isTV && detail?.runtime && (
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{formatRuntime(detail.runtime)}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {detail?.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {detail.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1.5 rounded-full bg-white/10 text-sm hover:bg-white/20 transition cursor-pointer"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
                    >
                      <FaPlay /> Treylerni ko'rish
                    </button>
                  )}
                  
                  {detail?.homepage && (
                    <a
                      href={detail.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 font-semibold transition"
                    >
                      <FaExternalLinkAlt /> Rasmiy sayt
                    </a>
                  )}
                  
                  <button
                    onClick={copyShare}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
                  >
                    <FaShare /> Ulashish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div className="rounded-2xl bg-white/5 p-6">
                  <h2 className="text-2xl font-bold mb-4">Tavsif</h2>
                  <p className="text-white/80 leading-relaxed">
                    {detail?.overview || "Tavsif mavjud emas."}
                  </p>
                </div>

                {/* TV Stats */}
                {isTV && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold">{detail.number_of_seasons}</p>
                      <p className="text-white/60 text-sm">Sezonlar</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold">{detail.number_of_episodes}</p>
                      <p className="text-white/60 text-sm">Epizodlar</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold">{detail.popularity?.toFixed(0)}</p>
                      <p className="text-white/60 text-sm">Ommaviylik</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-bold">{detail.vote_count?.toLocaleString()}</p>
                      <p className="text-white/60 text-sm">Ovozlar</p>
                    </div>
                  </div>
                )}

                {/* Top Cast */}
                {cast.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Asosiy Aktyorlar</h2>
                      <button
                        onClick={() => setShowMoreCast(prev => prev === 12 ? 24 : 12)}
                        className="text-sm text-white/60 hover:text-white"
                      >
                        {showMoreCast === 12 ? 'Koʻproq' : 'Kamroq'}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {cast.slice(0, showMoreCast).map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* External Links */}
                <div className="rounded-2xl bg-white/5 p-6">
                  <h3 className="text-xl font-bold mb-4">Tashqi Havolalar</h3>
                  <div className="space-y-3">
                    {externalIds?.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FaImdb className="text-yellow-400 text-xl" />
                          <span className="font-semibold">IMDb</span>
                        </div>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    
                    {externalIds?.facebook_id && (
                      <a
                        href={`https://facebook.com/${externalIds.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FaFacebook className="text-blue-400 text-xl" />
                          <span className="font-semibold">Facebook</span>
                        </div>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    
                    {externalIds?.twitter_id && (
                      <a
                        href={`https://twitter.com/${externalIds.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FaTwitter className="text-sky-400 text-xl" />
                          <span className="font-semibold">Twitter</span>
                        </div>
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>

                {/* Keywords */}
                {keywords?.keywords?.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-6">
                    <h3 className="text-xl font-bold mb-4">Kalit soʻzlar</h3>
                    <div className="flex flex-wrap gap-2">
                      {keywords.keywords.slice(0, 10).map((kw) => (
                        <span
                          key={kw.id}
                          className="px-3 py-1.5 rounded-full text-sm bg-white/10 hover:bg-white/20 transition cursor-pointer"
                        >
                          {kw.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CAST TAB */}
          {activeTab === 'cast' && (
            <div className="space-y-8">
              {/* Cast Section */}
              {cast.length > 0 && (
                <div className="rounded-2xl bg-white/5 p-6">
                  <h2 className="text-2xl font-bold mb-6">Aktyorlar ({cast.length})</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {cast.map((actor) => (
                      <ActorCard key={actor.id} actor={actor} />
                    ))}
                  </div>
                </div>
              )}

              {/* Crew Section */}
              {crew.length > 0 && (
                <div className="rounded-2xl bg-white/5 p-6">
                  <h2 className="text-2xl font-bold mb-6">Ishlab chiqarish jamoasi</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {crew.slice(0, 12).map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src={person.profile_path ? `${IMAGE_W185}${person.profile_path}` : FALLBACK_AVATAR}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-1">{person.name}</p>
                          <p className="text-xs text-white/60 line-clamp-1">
                            {person.job || person.department}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MEDIA TAB */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              {/* Videos */}
              {videos?.results?.length > 0 && (
                <div className="rounded-2xl bg-white/5 p-6">
                  <h2 className="text-2xl font-bold mb-6">Videolar ({videos.results.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.results.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}

              {/* Images */}
              {(images.backdrops?.length > 0 || images.posters?.length > 0) && (
                <div className="rounded-2xl bg-white/5 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Rasmlar</h2>
                    <button
                      onClick={() => setShowImageGallery(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                      <FaImages /> Galereyani ochish
                    </button>
                  </div>

                  {images.backdrops?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Fon rasmlari ({images.backdrops.length})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.backdrops.slice(0, 6).map((img, idx) => (
                          <img
                            key={img.file_path}
                            src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                            alt={`Backdrop ${idx + 1}`}
                            className="w-full aspect-video object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            onClick={() => {
                              setSelectedImageIndex(idx);
                              setShowImageGallery(true);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {images.posters?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Posterlar ({images.posters.length})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {images.posters.slice(0, 12).map((img, idx) => (
                          <img
                            key={img.file_path}
                            src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
                            alt={`Poster ${idx + 1}`}
                            className="w-full aspect-[2/3] object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            onClick={() => {
                              setSelectedImageIndex((images.backdrops?.length || 0) + idx);
                              setShowImageGallery(true);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SEASONS TAB */}
          {activeTab === 'seasons' && isTV && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Sezonlar ({detail.seasons?.length || 0})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detail.seasons?.map((season) => (
                  <div
                    key={season.id}
                    className="rounded-2xl bg-white/5 p-6 hover:bg-white/10 transition cursor-pointer"
                    onClick={() => window.open(`/tv/${detail.id}/season/${season.season_number}`, '_blank')}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 shrink-0">
                        <img
                          src={season.poster_path ? `${IMAGE_W185}${season.poster_path}` : FALLBACK_POSTER}
                          alt={season.name}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{season.name}</h3>
                        <p className="text-sm text-white/60 mb-2">
                          {season.episode_count} epizod • {season.air_date?.split('-')[0] || 'TBA'}
                        </p>
                        <p className="text-sm text-white/80 line-clamp-3">
                          {season.overview || "Tavsif mavjud emas."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Technical Details */}
                <div className="rounded-2xl bg-white/5 p-6">
                  <h2 className="text-2xl font-bold mb-6">Texnik Ma'lumotlar</h2>
                  <div className="space-y-4">
                    <DetailRow label="TMDB ID" value={detail.id} />
                    <DetailRow label="Original Title" value={detail.original_title || detail.original_name} />
                    <DetailRow label="Original Language" value={detail.original_language?.toUpperCase()} />
                    <DetailRow label="Status" value={detail.status} />
                    <DetailRow label="Release Date" value={formatDate(detail.release_date || detail.first_air_date)} />
                    {isTV && <DetailRow label="Last Air Date" value={formatDate(detail.last_air_date)} />}
                    <DetailRow 
                      label={isTV ? "Episode Runtime" : "Runtime"} 
                      value={isTV ? formatEpisodeRuntime(detail.episode_run_time) : formatRuntime(detail.runtime)} 
                    />
                    <DetailRow label="Vote Average" value={`${detail.vote_average?.toFixed(3)} / 10`} />
                    <DetailRow label="Vote Count" value={detail.vote_count?.toLocaleString()} />
                    <DetailRow label="Popularity" value={detail.popularity?.toFixed(4)} />
                    {!isTV && <DetailRow label="Budget" value={formatCurrency(detail.budget)} />}
                    {!isTV && <DetailRow label="Revenue" value={formatCurrency(detail.revenue)} />}
                  </div>
                </div>

                {/* Production Companies */}
                {detail.production_companies?.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-6">
                    <h2 className="text-2xl font-bold mb-6">Ishlab chiqaruvchi kompaniyalar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detail.production_companies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Spoken Languages */}
                {detail.spoken_languages?.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-6">
                    <h3 className="text-xl font-bold mb-4">Gapiriladigan tillar</h3>
                    <div className="space-y-2">
                      {detail.spoken_languages.map((lang) => (
                        <div
                          key={lang.iso_639_1}
                          className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                        >
                          <span className="font-medium">{lang.english_name}</span>
                          <span className="text-sm text-white/60">{lang.iso_639_1.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Production Countries */}
                {detail.production_countries?.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-6">
                    <h3 className="text-xl font-bold mb-4">Ishlab chiqarish mamlakatlari</h3>
                    <div className="space-y-2">
                      {detail.production_countries.map((country) => (
                        <div
                          key={country.iso_3166_1}
                          className="p-3 rounded-lg bg-white/5"
                        >
                          <p className="font-medium">{country.name}</p>
                          <p className="text-sm text-white/60">{country.iso_3166_1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ========== SIMILAR & RECOMMENDATIONS ========== */}
        {(similar?.results?.length > 0 || recommendations?.results?.length > 0) && (
          <div className="mt-16 space-y-12">
            {/* Similar */}
            {similar?.results?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">O'xshash {isTV ? 'seriallar' : 'filmlar'}</h2>
                  <button
                    onClick={() => setShowMoreSimilar(prev => prev + 8)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    Ko'proq ko'rsatish (+8)
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similar.results.slice(0, showMoreSimilar).map((item) => (
                    <MovieCard key={item.id} movie={item} type={type} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations?.results?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8">Tavsiya etilgan {isTV ? 'seriallar' : 'filmlar'}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {recommendations.results.slice(0, 12).map((item) => (
                    <MovieCard key={item.id} movie={item} type={type} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========== MODALS ========== */}
      {/* Trailer Modal */}
      {showTrailer && (
        <TrailerModal video={trailer} onClose={() => setShowTrailer(false)} />
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <ImageGalleryModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setShowImageGallery(false)}
        />
      )}
    </div>
  );
}

// Helper Component for Details
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
    <span className="text-white/60">{label}</span>
    <span className="font-semibold text-right max-w-[60%] break-words">
      {value || "N/A"}
    </span>
  </div>
);

export default MovieDetail;