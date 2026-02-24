import React, { useEffect, useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp, FaStar, FaFire, FaClock, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { MdMovie, MdLocalMovies, MdTv, MdFavorite } from 'react-icons/md';
import { fetchCategory } from './server/api';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Categories({setIsLoading}) {

    const [genres, setGenres] = useState([]);
    const { language } = useLanguage();



  const genreGradients = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-lime-500 to-green-500',
    'from-yellow-500 to-amber-500',
    'from-orange-500 to-red-500',
    'from-red-500 to-pink-500',
    'from-sky-500 to-blue-600',
    'from-fuchsia-500 to-purple-600',
    'from-stone-500 to-neutral-700',
    'from-slate-600 to-gray-800',
    'from-teal-400 to-emerald-600',
    'from-amber-600 to-orange-700',
    'from-rose-400 to-red-500',
  ];
  const getRandomGradient = () => {
  return genreGradients[
    Math.floor(Math.random() * genreGradients.length)
  ];
};


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
  return (
    <div className='mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      

      {/* Asosiy kategoriyalar grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {genres.map((category) => (
          <Link to={`/genre/${category.id}`}
            key={category.id}
          
            className=" flex justify-center items-center  relative group p-4 rounded-xl transition-all duration-300 h-22 
            bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 cursor-pointer"
          >
            {/* Gradient overlay for colored categories */}
      
              <div className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient()} opacity-10 rounded-xl`}></div>
           
            
            <div className="relative flex flex-col items-center text-center space-y-3">
              {/* Icon */}
           
              
              {/* Label */}
              <div>
                <h3 className="font-semibold text-white">{category?.name}</h3>
              
              </div>
              
              
            </div>
          </Link >
        ))}
      </div>

    </div>
  );
}

export default Categories;