import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMulti } from "./server/api";
import { useLanguage } from "./LanguageContext";
import MovieCard from "../components/MovieCard";

export default function SearchPage({ setIsLoading }) {
  const { language } = useLanguage();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const filterMT = (arr = []) =>
    arr.filter((x) => x.media_type === "movie" || x.media_type === "tv");

  // q yoki language o‘zgarsa: boshidan boshlaymiz
  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!q) {
        setResults([]);
        setPage(1);
        setTotalPages(1);
        return;
      }

      try {
        setIsLoading?.(true);
        setLoadingMore(false);

        const data = await searchMulti(q, language, 1);
        if (!mounted) return;

        const filtered = filterMT(data.results || []);
        setResults(filtered);
        setPage(data.page || 1);
        setTotalPages(data.total_pages || 1);
      } finally {
        if (mounted) setIsLoading?.(false);
      }
    };

    run();
    return () => (mounted = false);
  }, [q, language, setIsLoading]);

  const canShowMore = results.length > 0 && page < totalPages;

  const handleShowMore = async () => {
    if (!q || loadingMore || !canShowMore) return;

    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      const data = await searchMulti(q, language, nextPage);

      const filtered = filterMT(data.results || []);

      // duplicate bo‘lib qolmasin (xavfsizlik)
      setResults((prev) => {
        const map = new Map(prev.map((x) => [`${x.media_type}-${x.id}`, x]));
        for (const item of filtered) {
          map.set(`${item.media_type}-${item.id}`, item);
        }
        return Array.from(map.values());
      });

      setPage(data.page || nextPage);
      setTotalPages(data.total_pages || totalPages);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-24">
      <h1 className="text-white text-2xl font-bold mb-5">
        Qidiruv: <span className="text-white/70">{q || "—"}</span>
      </h1>

      {results.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/70">
          Natija topilmadi.
        </div>
      ) : (
        <>
          <div className="flex items-center flex-wrap justify-center gap-4">
            {results.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
            ))}
          </div>

          {/* Show More */}
          <div className="flex justify-center mt-8">
            {canShowMore ? (
              <button
                onClick={handleShowMore}
                disabled={loadingMore}
                className="
                  inline-flex items-center justify-center
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
                Boshqa natija yo‘q.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
