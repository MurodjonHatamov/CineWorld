import React, { useEffect, useMemo, useState } from "react";
import { FaFilm, FaTv } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { fetchCategory } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";
import { IoMdClose } from "react-icons/io";

function Sidebar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);

  const mainMenu = useMemo(
    () => [
      { id: "movies", label: "Filmlar", icon: <FaFilm />, path: "/" },
      { id: "series", label: "Seriallar", icon: <FaTv />, path: "/tv" },
    ],
    []
  );

  // Fetch genres
  useEffect(() => {
    let mounted = true;

    const getGenres = async () => {
      try {
        setLoadingGenres(true);
        const data = await fetchCategory(language);
        if (!mounted) return;
        setGenres(Array.isArray(data) ? data : []);
      } finally {
        if (mounted) setLoadingGenres(false);
      }
    };

    getGenres();
    return () => {
      mounted = false;
    };
  }, [language]);

  // ESC -> close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  // Route change -> close (foydali)
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const go = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          transition-opacity duration-200
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          bg-black/60 backdrop-blur-[2px]
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 max-w-[85vw]
          bg-[#0b0f17]/95 backdrop-blur-xl
          border-r border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,.6)]
          transform transition-transform duration-200 ease-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
              <h2 className="text-xl text-white font-cinzel tracking-wide">
                CineWorld
              </h2>
            </Link>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition"
              aria-label="Close menu"
              title="Yopish"
            >
              <IoMdClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Main */}
          <div className="p-4">
            <p className="text-xs text-white/50 mb-3 tracking-widest uppercase">
              Asosiy
            </p>

            <div className="space-y-2">
              {mainMenu.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                      border transition
                      ${active ? "bg-white/10 border-white/10 text-white" : "bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10"}
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genres */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/50 tracking-widest uppercase">
                Janrlar
              </p>
              <button
                onClick={() => go("/categories")}
                className="text-xs text-white/60 hover:text-white underline"
              >
                Barchasi
              </button>
            </div>

            {loadingGenres ? (
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-1 scrollbar-hide">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => go(`/genre/${genre.id}`)}
                    className="
                      w-full text-left px-4 py-2.5 rounded-2xl
                      bg-white/5 border border-white/10
                      text-white/80 hover:text-white hover:bg-white/10
                      transition
                    "
                  >
                    {genre.name}
                  </button>
                ))}

                {genres.length === 0 && (
                  <p className="text-white/60 text-sm">
                    Janrlar topilmadi.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer mini */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} CineWorld
          </p>
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
      </aside>
    </>
  );
}

export default Sidebar;
