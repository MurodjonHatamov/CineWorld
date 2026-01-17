import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBasicMovieDetail } from "../pages/server/api";
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
} from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { MdOutlinePlayCircle } from "react-icons/md";
import MovieCard from "../components/MovieCard";

const IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMAGE_W500 = "https://image.tmdb.org/t/p/w500";
const IMAGE_W185 = "https://image.tmdb.org/t/p/w185";
const IMAGE_LOGO = "https://image.tmdb.org/t/p/w92";

const FALLBACK_BACKDROP =
  "https://via.placeholder.com/1600x900?text=No+Backdrop";
const FALLBACK_POSTER =
  "https://via.placeholder.com/500x750?text=No+Poster";
const FALLBACK_AVATAR =
  "https://img.freepik.com/premium-photo/no-clapboard-png-symbol-forbidden-sign-transparent-background_53876-950740.jpg?semt=ais_hybrid&w=740&q=80";
const FALLBACK_COLLECTION =
  "https://via.placeholder.com/600x900?text=No+Collection+Poster";

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    fetchBasicMovieDetail(id)
      .then((res) => {
        setData(res);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link nusxalandi ✅");
    } catch {
      prompt("Linkni nusxalab oling:", window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-3">Film topilmadi</h2>
          <p className="text-white/70 mb-6">
            ID noto‘g‘ri bo‘lishi yoki serverda xatolik bo‘lishi mumkin.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const { detail, cast = [], trailer, similar = [] } = data;

  const title = detail?.title || detail?.name || "Nomsiz";
  const year = detail?.release_date ? detail.release_date.split("-")[0] : "—";
  const rating =
    typeof detail?.vote_average === "number"
      ? detail.vote_average.toFixed(1)
      : "—";

  const backdrop = detail?.backdrop_path
    ? `${IMAGE_ORIGINAL}${detail.backdrop_path}`
    : FALLBACK_BACKDROP;

  const poster = detail?.poster_path
    ? `${IMAGE_W500}${detail.poster_path}`
    : FALLBACK_POSTER;

  const imdbUrl = detail?.imdb_id
    ? `https://www.imdb.com/title/${detail.imdb_id}`
    : null;

  const homepageOk = Boolean(detail?.homepage && detail.homepage.trim());

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="relative">
        <div
          className="h-[62vh] md:h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* content */}
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-end pb-8 md:pb-12">
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              {/* poster */}
              <div className="w-36 md:w-60 shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <img
                    src={poster}
                    alt={title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = FALLBACK_POSTER)}
                  />
                </div>
              </div>

              {/* info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {detail?.adult && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-red-600/90">
                      18+
                    </span>
                  )}
                  {detail?.status && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-white/10 border border-white/10">
                      {detail.status}
                    </span>
                  )}
                  {detail?.video && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-white/10 border border-white/10">
                      Video: Yes
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  {title}
                </h1>

                {detail?.tagline && (
                  <p className="text-white/70 mt-2 italic line-clamp-2">
                    “{detail.tagline}”
                  </p>
                )}

                {/* meta chips */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-white/60 text-sm">
                      /10 ({detail?.vote_count ?? 0})
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                    <FaCalendarAlt className="text-blue-400" />
                    <span className="font-medium">{year}</span>
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                    <FaClock className="text-green-400" />
                    <span className="font-medium">
                      {formatRuntime(detail?.runtime)}
                    </span>
                  </span>

                  {detail?.origin_country?.length > 0 && (
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10">
                      <IoEarthOutline className="text-emerald-400" />
                      <span className="font-medium">
                        {detail.origin_country.join(", ")}
                      </span>
                    </span>
                  )}
                </div>

                {/* genres */}
                {detail?.genres?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {detail.genres.map((g) => (
                      <span
                        key={g.id}
                        className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10 hover:bg-white/15 transition"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition active:scale-[0.98]"
                  >
                    <MdOutlinePlayCircle className="text-xl" />
                    Treyler
                  </button>

                  {homepageOk && (
                    <a
                      href={detail.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black hover:bg-white/90 font-semibold transition active:scale-[0.98]"
                    >
                      Homepage <FaExternalLinkAlt className="text-sm" />
                    </a>
                  )}

                  {imdbUrl && (
                    <a
                      href={imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold active:scale-[0.98]"
                    >
                      IMDb <FaExternalLinkAlt className="text-sm" />
                    </a>
                  )}

                  <button
                    onClick={copyShare}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition active:scale-[0.98]"
                    title="Ulashish"
                  >
                    <FaShare />
                    Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* overview */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <h2 className="text-xl font-bold mb-3">Tavsif</h2>
              <p className="text-white/75 leading-relaxed">
                {detail?.overview || "Tavsif mavjud emas."}
              </p>
            </div>

            {/* COLLECTION */}
            {detail?.belongs_to_collection && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Collection</h2>
                  <span className="text-sm text-white/60">
                    ID: {detail.belongs_to_collection.id}
                  </span>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-24 shrink-0 rounded-2xl overflow-hidden ring-1 ring-white/10">
                    <img
                      src={
                        detail.belongs_to_collection.poster_path
                          ? `${IMAGE_W500}${detail.belongs_to_collection.poster_path}`
                          : FALLBACK_COLLECTION
                      }
                      alt={detail.belongs_to_collection.name}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      onError={(e) =>
                        (e.currentTarget.src = FALLBACK_COLLECTION)
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-extrabold">
                      {detail.belongs_to_collection.name}
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      Backdrop:{" "}
                      {detail.belongs_to_collection.backdrop_path ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* cast */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Aktyorlar</h2>
                <span className="text-sm text-white/60">
                  {cast.length} ta
                </span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {cast.slice(0, 18).map((actor) => (
                  <div
                    key={actor.id}
                    className="shrink-0 w-24 text-center group"
                    title={`${actor.name} as ${actor.character}`}
                  >
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-white/30 transition">
                      <img
                        src={
                          actor.profile_path
                            ? `${IMAGE_W185}${actor.profile_path}`
                            : FALLBACK_AVATAR
                        }
                        alt={actor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        loading="lazy"
                        onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
                      />
                    </div>
                    <p className="mt-2 text-sm font-medium line-clamp-1">
                      {actor.name}
                    </p>
                    <p className="text-xs text-white/60 line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT (FULL UI) */}
          <div className="space-y-6">
            {/* FULL STATS */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <h2 className="text-xl font-bold mb-4">Ma’lumot (Full)</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">TMDB ID</span>
                  <span className="font-semibold">{detail?.id ?? "—"}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Original title</span>
                  <span className="font-semibold text-right max-w-[60%] break-words">
                    {detail?.original_title || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Language</span>
                  <span className="font-semibold">
                    {detail?.original_language?.toUpperCase?.() || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Release</span>
                  <span className="font-semibold">
                    {detail?.release_date || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Runtime</span>
                  <span className="font-semibold">
                    {formatRuntime(detail?.runtime)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Vote avg</span>
                  <span className="font-semibold">
                    {typeof detail?.vote_average === "number"
                      ? detail.vote_average.toFixed(3)
                      : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Vote count</span>
                  <span className="font-semibold">
                    {detail?.vote_count ?? "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Popularity</span>
                  <span className="font-semibold">
                    {typeof detail?.popularity === "number"
                      ? detail.popularity.toFixed(4)
                      : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Status</span>
                  <span className="font-semibold">{detail?.status || "—"}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Adult</span>
                  <span className="font-semibold">
                    {detail?.adult ? "Yes (18+)" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Video</span>
                  <span className="font-semibold">
                    {detail?.video ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Budget</span>
                  <span className="font-semibold">
                    {formatCurrency(detail?.budget)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Revenue</span>
                  <span className="font-semibold">
                    {formatCurrency(detail?.revenue)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {imdbUrl && (
                  <a
                    href={imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
                  >
                    IMDb sahifasi <FaExternalLinkAlt className="text-sm" />
                  </a>
                )}

                {homepageOk && (
                  <a
                    href={detail.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition font-semibold"
                  >
                    <FaLink /> Homepage <FaExternalLinkAlt className="text-sm" />
                  </a>
                )}
              </div>
            </div>

            {/* SPOKEN LANGUAGES */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <FaLanguage className="text-white/60" />
                <h3 className="text-lg font-bold">Spoken languages</h3>
              </div>

              {detail?.spoken_languages?.length ? (
                <div className="flex flex-wrap gap-2">
                  {detail.spoken_languages.map((l) => (
                    <span
                      key={l.iso_639_1}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10"
                    >
                      {l.english_name} ({l.iso_639_1})
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">N/A</p>
              )}
            </div>

            {/* PRODUCTION COUNTRIES */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <IoEarthOutline className="text-white/60" />
                <h3 className="text-lg font-bold">Production countries</h3>
              </div>

              {detail?.production_countries?.length ? (
                <div className="flex flex-wrap gap-2">
                  {detail.production_countries.map((c) => (
                    <span
                      key={c.iso_3166_1}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10"
                    >
                      {c.name} ({c.iso_3166_1})
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">N/A</p>
              )}
            </div>

            {/* PRODUCTION COMPANIES */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <FaFilm className="text-white/60" />
                <h3 className="text-lg font-bold">Production companies</h3>
              </div>

              {detail?.production_companies?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {detail.production_companies.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {c.logo_path ? (
                          <img
                            src={`${IMAGE_LOGO}${c.logo_path}`}
                            alt={c.name}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <FaMoneyBillWave className="text-white/35" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">
                          {c.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {c.origin_country || "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">N/A</p>
              )}
            </div>
          </div>
        </div>

        {/* similar */}
        {similar?.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">O‘xshash filmlar</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {similar.slice(0, 14).map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer modal */}
      {showTrailer && trailer?.key && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-2xl p-2"
            >
              ✕
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10">
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

    
    </div>
  );
}

export default MovieDetail;
