import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider";
import SwiperCard from "../components/SwiperCard";
import { fetchMovies, fetchCategory, movieSections, searchMulti } from "./server/api";
import { useLanguage } from "./LanguageContext";
import { Link } from "react-router-dom";

function Home({ setIsLoading }) {
  const [moviesBySection, setMoviesBySection] = useState({});
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);
// console.log(moviesBySection);

  const { language } = useLanguage();
const scrollTop=()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  // Sections (movies)
useEffect(() => {
  scrollTop();
  let mounted = true;

  const loadSections = async () => {
    setIsLoading(true);

    movieSections.forEach(async (section) => {
      try {
        const data = await fetchMovies(section.endpoint, language, { randomPage: true });
        
        if (mounted) {
        
          setMoviesBySection((prev) => ({
            ...prev,
            [section.id]: Array.isArray(data) ? data : []
          }));
        }
      } catch (err) {
  return [];
      }
    });
    setIsLoading(false);
  };

  loadSections();
  return () => { mounted = false; };
}, [language]);




  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      const data = await fetchCategory(language,"movie");
      const tvData = await fetchCategory(language,"tv");
      const allData = [...data, ...tvData].filter(
        (genre, index, self) =>
          index === self.findIndex(g => g.id === genre.id)
      );
      setGenres(allData.slice(0, 10));
      setIsLoading(false);
    };
    getGenres();
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
  
            
             { genres.map((g) => (
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
            }

            {!genresLoading && genres.length === 0 && (
              <div className="text-white/60 text-sm py-2">
                Kategoriyalar topilmadi.
              </div>
            )}
          </div>
        </div>


  
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
