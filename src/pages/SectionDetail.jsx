  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { fetchBySection } from "./server/api";
  import MovieCard from "../components/MovieCard";
  import { useLanguage } from "./LanguageContext";

  function SectionDetail({ setIsLoading }) {
    const { type, id } = useParams();

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  const {language}=useLanguage()
    const loadData = async () => {
      if (!hasMore) return;
    
      setIsLoading(true);
      const data = await fetchBySection(type, id, page,language);
    
      setMovies(prev => {
        const ids = new Set(prev.map(m => m.id));
        const unique = data.results.filter(m => !ids.has(m.id));
        return [...prev, ...unique];
      });
    
      if (page >= data.total_pages) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    
      setIsLoading(false);
    };
    
    // 1️⃣ Birinchi yuklash
    useEffect(() => {
      setMovies([]);
      setPage(1);
      setHasMore(true);
    }, [type, id,language]);

    useEffect(() => {
      loadData();
    }, [page === 1,language]);

    // 2️⃣ Scroll kuzatuvchi
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 400
        ) {
          loadData();
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [page, hasMore]);

    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl mb-4">
          {type === "movie" ? "Filmlar" : "Seriallar"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {!hasMore && (
          <p className="text-center text-gray-400 mt-6">
            Barcha maʼlumotlar yuklandi
          </p>
        )}
      </div>
    );
  }

  export default SectionDetail;
