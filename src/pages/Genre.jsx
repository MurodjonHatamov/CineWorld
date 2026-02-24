import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByGenre } from "./server/api";
import { useLanguage } from "./LanguageContext";
import MovieCard from "../components/MovieCard";

function Genre({ setIsLoading }) {
  const { id } = useParams();
  const { language } = useLanguage();

  const [type, setType] = useState("all"); // all | movie | tv

  // Filters
  const [sortByMovie, setSortByMovie] = useState("popularity.desc");
  const [sortByTv, setSortByTv] = useState("popularity.desc");
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState("");
  const [origLang, setOrigLang] = useState(""); // "en", "ru", ...
  const [includeAdult, setIncludeAdult] = useState(false);

  // Data for each type (separate pagination)
  const [movieState, setMovieState] = useState({ list: [], page: 1, totalPages: 1 });
  const [tvState, setTvState] = useState({ list: [], page: 1, totalPages: 1 });


  const buildOptions = (t, page = 1) => ({
    page,
    sort_by: t === "movie" ? sortByMovie : sortByTv,
    include_adult: includeAdult,
    vote_gte: minRating ? Number(minRating) : undefined,
    original_language: origLang || undefined,
    year: t === "movie" ? (year ? Number(year) : undefined) : undefined,
    first_air_year: t === "tv" ? (year ? Number(year) : undefined) : undefined,
  });

  // Fetch initial / on filter change
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setIsLoading?.(true);

        // reset lists when filters/type/genre changes
        if (type === "movie" || type === "all") {
          const movieData = await fetchByGenre("movie", id, language, buildOptions("movie", 1));
          if (!mounted) return;
          setMovieState({
            list: movieData.results,
            page: movieData.page,
            totalPages: movieData.total_pages,
          });
        } else {
          if (!mounted) return;
          setMovieState({ list: [], page: 1, totalPages: 1 });
        }

        if (type === "tv" || type === "all") {
          const tvData = await fetchByGenre("tv", id, language, buildOptions("tv", 1));
          if (!mounted) return;
          setTvState({
            list: tvData.results,
            page: tvData.page,
            totalPages: tvData.total_pages,
          });
        } else {
          if (!mounted) return;
          setTvState({ list: [], page: 1, totalPages: 1 });
        }
      } finally {
        if (mounted) setIsLoading?.(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [
    id,
    language,
    type,
    sortByMovie,
    sortByTv,
    year,
    minRating,
    origLang,
    includeAdult,
    setIsLoading,
  ]);

  const mergedAll = useMemo(() => {
    if (type !== "all") return [];
    // movie+tv aralash (keyin xohlasang alohida bo‘lib ko‘rsatamiz)
    return [...movieState.list, ...tvState.list];
  }, [type, movieState.list, tvState.list]);

  const canMoreMovie = movieState.page < movieState.totalPages;
  const canMoreTv = tvState.page < tvState.totalPages;

  const showMoreMovie = async () => {
    if (!canMoreMovie) return;
    const next = movieState.page + 1;
    const data = await fetchByGenre("movie", id, language, buildOptions("movie", next));
    setMovieState((prev) => ({
      list: [...prev.list, ...data.results],
      page: data.page,
      totalPages: data.total_pages,
    }));
  };

  const showMoreTv = async () => {
    if (!canMoreTv) return;
    const next = tvState.page + 1;
    const data = await fetchByGenre("tv", id, language, buildOptions("tv", next));
    setTvState((prev) => ({
      list: [...prev.list, ...data.results],
      page: data.page,
      totalPages: data.total_pages,
    }));
  };

  // UI helpers
  const tabBtn = (val, label) => (
    <button
      onClick={() => setType(val)}
      className={`
        px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
        ${type === val ? "bg-white text-black shadow" : "text-white/70 hover:text-white hover:bg-white/10"}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-wide">Janr bo‘yicha</h2>
        <p className="text-white/60 text-sm mt-1">Filter qo‘llab qidir</p>
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
        {tabBtn("all", "Barchasi")}
        {tabBtn("movie", "Filmlar")}
        {tabBtn("tv", "Seriallar")}
      </div>

      {/* Filters */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* sort */}
        <select
          value={type === "tv" ? sortByTv : sortByMovie}
          onChange={(e) => (type === "tv" ? setSortByTv(e.target.value) : setSortByMovie(e.target.value))}
          className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none"
          disabled={type === "all"} // all bo‘lsa xohlasang ikkala sortni alohida qilamiz
        >
          {type !== "tv" ? (
            <>
              <option className="bg-black" value="popularity.desc">Mashhur</option>
              <option className="bg-black" value="primary_release_date.desc">Yangi</option>
              <option className="bg-black" value="vote_average.desc">Reyting</option>
              <option className="bg-black" value="vote_count.desc">Ko‘p ovoz</option>
              <option className="bg-black" value="revenue.desc">Daromad</option>
            </>
          ) : (
            <>
              <option className="bg-black" value="popularity.desc">Mashhur</option>
              <option className="bg-black" value="first_air_date.desc">Yangi</option>
              <option className="bg-black" value="vote_average.desc">Reyting</option>
              <option className="bg-black" value="vote_count.desc">Ko‘p ovoz</option>
              <option className="bg-black" value="name.asc">A-Z</option>
            </>
          )}
        </select>

        {/* year */}
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Yil (mas: 2024)"
          className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none placeholder:text-white/30"
        />

        {/* min rating */}
        <input
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          placeholder="Min rating (0-10)"
          className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none placeholder:text-white/30"
        />

        {/* original language */}
        <input
          value={origLang}
          onChange={(e) => setOrigLang(e.target.value)}
          placeholder="Til (en, ru, ko...)"
          className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 outline-none placeholder:text-white/30"
        />

        {/* adult */}
        <button
          onClick={() => setIncludeAdult((s) => !s)}
          className={`
            rounded-xl px-4 py-2 border border-white/10 transition
            ${includeAdult ? "bg-white text-black" : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"}
          `}
          title="18+ kontent"
        >
          18+ {includeAdult ? "ON" : "OFF"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-8">
        {type === "movie" && movieState.list.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-white/70">
            Bu janr bo‘yicha film topilmadi.
          </div>
        )}

        {type === "tv" && tvState.list.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-white/70">
            Bu janr bo‘yicha serial topilmadi.
          </div>
        )}

        {type === "all" && mergedAll.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-white/70">
            Bu janr bo‘yicha film/serial topilmadi.
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(type === "movie" ? movieState.list : type === "tv" ? tvState.list : mergedAll).map((item) => (
            <MovieCard key={`${item.media_type || type}-${item.id}`} movie={item} />
          ))}
        </div>

        {/* Show More */}
        <div className="flex justify-center mt-8 gap-3">
          {type === "movie" && canMoreMovie && (
            <button
              onClick={showMoreMovie}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Show More
            </button>
          )}

          {type === "tv" && canMoreTv && (
            <button
              onClick={showMoreTv}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Show More
            </button>
          )}

          
        </div>
      </div>
    </div>
  );
}

export default Genre;
