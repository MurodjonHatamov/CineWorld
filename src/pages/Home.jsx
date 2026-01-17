import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider";
import SwiperCard from "../components/SwiperCard";
import { fetchMovies, fetchCategory, movieSections } from "./server/api";
import { useLanguage } from "./LanguageContext";
import { Link } from "react-router-dom";

function Home({ setIsLoading }) {
  const [moviesBySection, setMoviesBySection] = useState({});
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);

  const { language } = useLanguage();

  // Sections (movies)
  useEffect(() => {
    let mounted = true;

    const loadSections = async () => {
      try {
        setIsLoading(true);

        const results = await Promise.all(
          movieSections.map((section) =>
            fetchMovies(section.endpoint, language)
              .then((data) => [section.id, Array.isArray(data) ? data : []])
              .catch(() => [section.id, []])
          )
        );

        if (!mounted) return;

        const mapped = Object.fromEntries(results);
        setMoviesBySection(mapped);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadSections();

    return () => {
      mounted = false;
    };
  }, [language, setIsLoading]);

  // Genres (categories)
  useEffect(() => {
    let mounted = true;

    const loadGenres = async () => {
      try {
        setGenresLoading(true);
        const data = await fetchCategory(language);
        if (!mounted) return;
        setGenres(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setGenres([]);
      } finally {
        if (mounted) setGenresLoading(false);
      }
    };

    loadGenres();

    return () => {
      mounted = false;
    };
  }, [language]);

  return (
    <div>
      <div className="mt-2 max-w-7xl mx-auto">
        <HeaderSlider />
      </div>

      {/* ✅ Categories (Genres) */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 mb-4">
        <div className="flex items-end justify-between px-4 sm:px-0">
          <div>
            <h3 className="text-white text-xl font-extrabold">Kategoriyalar</h3>
            <p className="text-white/50 text-sm">
              Janrni tanlang va filmlarni ko‘ring
            </p>
          </div>

          <Link
            to="/categories"
            className="text-white/70 hover:text-white text-sm underline"
          >
            Barchasi
          </Link>
        </div>

        <div className="mt-4 px-4 sm:px-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {genresLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 h-10 w-28 rounded-full bg-white/10 border border-white/10 animate-pulse"
                />
              ))
            ) : (
              genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/genre/${g.id}`}
                  className="
                    shrink-0 px-4 py-2 rounded-full text-sm font-semibold
                    bg-white/5 border border-white/10
                    text-white/80 hover:text-white hover:bg-white/10
                    transition
                  "
                >
                  {g.name}
                </Link>
              ))
            )}

            {!genresLoading && genres.length === 0 && (
              <div className="text-white/60 text-sm py-2">
                Kategoriyalar topilmadi.
              </div>
            )}
          </div>
        </div>

        {/* scrollbar hide */}
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

      {/* Sections */}
      {movieSections.map((section) => (
        <section
          key={section.id}
          className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-2"
        >
          <SwiperCard
            title={section.title}
            movies={moviesBySection[section.id] || []}
            type="movie"
            sectionId={section.id}
          />
        </section>
      ))}
    </div>
  );
}

export default Home;
