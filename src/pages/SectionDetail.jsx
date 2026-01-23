import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBySection } from "./server/api";
import MovieCard from "../components/MovieCard";
import { useLanguage } from "./LanguageContext";

function SectionDetail({ setIsLoading }) {
  const { type, id } = useParams();
  const { language } = useLanguage();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const isFetchingRef = useRef(false);

  const hasMore = page <= totalPages;

  const loadPage = async (pageToLoad, mode = "replace") => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    if (pageToLoad === 1) setIsLoading?.(true);
    else setLoadingMore(true);

    try {
      const data = await fetchBySection(type, id, pageToLoad, language);

      const results = Array.isArray(data?.results) ? data.results : [];
      const tp = data?.total_pages || 1;

      setTotalPages(tp);

      setMovies((prev) => {
        const base = mode === "replace" ? [] : prev;

        // duplicate bo‘lmasin
        const map = new Map(base.map((m) => [m.id, m]));
        for (const item of results) map.set(item.id, item);
        return Array.from(map.values());
      });

      setPage(pageToLoad + 1);
    } catch (e) {
      console.error(e);
    } finally {
      isFetchingRef.current = false;
      setIsLoading?.(false);
      setLoadingMore(false);
    }
  };

  // first load / reset
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    isFetchingRef.current = false;

    loadPage(1, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, language]);

  const handleShowMore = () => {
    if (!hasMore) return;
    loadPage(page, "append");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-24">
      <h2 className="text-3xl font-bold text-white mb-5">
        {type === "movie" ? "Filmlar" : "Seriallar"}
      </h2>

      {movies.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/70">
          Hech narsa topilmadi.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((m) => (
              <MovieCard key={`${type}-${m.id}`} movie={m} />
            ))}
          </div>

          {/* Show More */}
          <div className="flex justify-center mt-10">
            {hasMore ? (
              <button
                onClick={handleShowMore}
                disabled={loadingMore}
                className="
                  px-6 py-3 rounded-xl
                  bg-white text-black font-semibold
                  hover:bg-white/90 transition
                  disabled:opacity-60 disabled:cursor-not-allowed
                  active:scale-[0.98]
                "
              >
                {loadingMore ? "Yuklanmoqda..." : "Show More"}
              </button>
            ) : (
              <p className="text-white/50 text-sm">
                Barcha maʼlumotlar yuklandi ✅
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SectionDetail;
