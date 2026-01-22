import React, { useState, useEffect } from 'react';
import { FaFilm, FaTv } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCategory } from '../pages/server/api';
import { useLanguage } from '../pages/LanguageContext';
import { IoMdClose } from 'react-icons/io';

function Sidebar({   isMenuOpen, setIsMenuOpen,setIsLoading}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [genres, setGenres] = useState([]);

  // Menu items
  const mainMenu = [
    { id: 'movies', label: 'Filmlar', icon: <FaFilm />, path: '/' },
    { id: 'series', label: 'Seriallar', icon: <FaTv />, path: '/tv' },
  ];

  // Fetch genres
  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      const data = await fetchCategory(language,"movie");
      const tvData = await fetchCategory(language,"tv");
      const allData = [...data, ...tvData].filter(
        (genre, index, self) =>
          index === self.findIndex(g => g.id === genre.id)
      );
      setGenres(allData);
      setIsLoading(false);
    };
    getGenres();
  }, [language]);


  const handleNavigation = (path) => {
    navigate(path);
      
  };

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`);

  };

  return (
    <>
      {/* Mobile overlay */}
      {isMenuOpen && (
        <div  onClick={()=>{setIsMenuOpen(false)

        }}
          className="fixed inset-0 bg-black/40 z-50"
    
        />
      )}

      {/* Sidebar */}
      <div className={`
          fixed top-0 left-0 h-screen w-64
    bg-black/60 backdrop-blur-xl
    transform transition-transform duration-200 ease-out
    z-50
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto border-r border-white/10
      `}>
        
        {/* Sidebar header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
          <Link to={"/"} onClick={()=>{
            setIsMenuOpen(false)
          }} className="flex items-center gap-2">
              <span className="bg-white/80 w-2.5 h-2.5  rounded-full" />
              <h2 className="text-xl sm:text-2xl text-white font-cinzel tracking-wide">
                CineWorld
              </h2>
            </Link>
            <button 
            onClick={()=>{
              setIsMenuOpen(false)
            }}
              className="iconBtn"
            >
              <IoMdClose className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-4">
          <h3 className="text-sm text-gray-400 mb-3">Asosiy</h3>
          <div className="space-y-2">
            {mainMenu.map((item) => (
              <button
                key={item.id}
                onClick={() =>{
                  setIsMenuOpen(false)
                  handleNavigation(item.path)

                 
                } }
                className="w-full flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5  rounded-lg transition-colors">
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Genres */}
        <div className="p-4 border-t border-white/10">
          <h3 className="text-sm text-gray-400 mb-3">Janrlar</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto sidebar-scroll">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => {handleGenreClick(genre.id)


                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5  rounded-lg transition-colors"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Sidebar;