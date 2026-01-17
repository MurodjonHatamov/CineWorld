import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoClose, IoMenu, IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchCategory, LANGUAGES } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";

function Navbar({ setIsLoading, isMenuOpen, setIsMenuOpen }) {
  const [menuCategory, setMenuCategory] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [q, setQ] = useState("");
  const navigation = useNavigate();
  const { language, setLanguage } = useLanguage("en-US");



  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      const data = await fetchCategory(language);
      setGenres(data);
      setIsLoading(false);
    };
    getGenres();
  }, [language]);




const onSearchSumbit=(e)=>{
e.preventDefault();
const value = q.trim();
if(!value) return;
setSearchOpen(false)
navigation(`/search?q=${encodeURIComponent(value)}`);
}




  return (
    <div className="fixed mx-auto z-50 w-full  left-0 top-0">
      <div
        className="   mt-2 max-w-7xl mx-auto relative z-10  rounded-2xl 
    bg-black/60 backdrop-blur-xl border border-white/10

    shadow-[0_10px_30px_rgba(0,0,0,0.5)]
    "
      >
        <div className="flex items-center justify-between h-16  z-10 px-6">
          <div className="flex items-center gap-8">
            <Link to={"/"} className="flex items-center gap-2">
              <span className="bg-white/80 w-2.5 h-2.5  rounded-full" />
              <h2 className="text-xl sm:text-2xl text-white font-cinzel tracking-wide">
                CineWorld
              </h2>
            </Link>
            <ul className="flex items-center gap-4 hidden sm:flex">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    ` px-4 py-2 rounded-xl text-sm font-medium transition     ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  Filmlar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tv"
                  className={({ isActive }) =>
                    ` px-4 py-2 rounded-xl text-sm font-medium transition     ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  Seriallar
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            {/* search button */}

            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
              }}
              className="iconBtn"
            >
              {searchOpen ? (
                <IoClose className="text-lg" />
              ) : (
                <IoSearch className="text-lg" />
              )}
            </button>

            {/* Language Select */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="textBtn "
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="bg-gray-900 text-white"
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="relative hidden sm:flex">
              <button
                onClick={() => {
                  setMenuCategory(!menuCategory);
                }}
                className="iconBtn"
              >
                
                {
                  menuCategory ? <IoClose className="text-lg"/> : <CgMenuGridO className="text-lg" />
                }

              </button>
              {menuCategory ? (
                <div
                  className="
 absolute right-0 top-12 w-64
                    rounded-2xl overflow-hidden
                    bg-[#0b0f17]/95 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_20px_60px_rgba(0,0,0,.55)]
"
                >
                  <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                    <p className="text-white font-semibold">Genres</p>
                    <button
                      onClick={() => navigation("/categories")}
                      className="text-xs text-white/70 hover:text-white underline"
                    >
                      Barchasi
                    </button>
                  </div>

                  <div className="max-h-80 overflow-auto scrollbar-hide p-2">
                    {genres.map((genre) => (
                      <Link
                        to={`/genre/${genre.id}`}
                        className="
                      block  text-white/80
                      px-4 py-2 text-sm hover:text-white rounded-xl hover:bg-white/5 "
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Mobile menu icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="textBtn flex sm:hidden "
              title="Menu"
            >
              <IoMenu className="text-xl" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="px-4 sm:px-6 pb-4">
            <form
             onSubmit={onSearchSumbit}
              className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-2"
            >
              <IoSearch className="text-white/60 text-lg ml-2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Film yoki serial qidirish..."
                className="w-full bg-transparent outline-none text-white placeholder:text-white/40 px-2 py-2"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Qidirish
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Navbar;
