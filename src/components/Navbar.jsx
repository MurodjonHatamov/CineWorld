import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoMenu, IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchCategory, LANGUAGES } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";

function Navbar({setIsLoading, isMenuOpen, setIsMenuOpen}) {

const [menuCategory,setMenuCategory]=useState(false)
const [genres, setGenres] = useState([]);
const navigation=useNavigate()
const {language,setLanguage}=useLanguage("en-US")
useEffect(() => {
  const getGenres = async () => {
  setIsLoading(true)
    const data = await fetchCategory(language);
    setGenres(data);
setIsLoading(false)
    
  };
  getGenres();
}, [language]);

  return (
    <div className="fixed mx-auto z-50 w-full  left-0 top-0">
   <div className="   mt-2 max-w-7xl mx-auto relative z-10  rounded-2xl 

   
    bg-gray-900

    ">

        <div className="flex items-center justify-between h-16 relative z-10 px-6">
       

<div className="flex items-center gap-10">
<Link to={"/"}>
<h2 className="text-2xl text-white font-cinzel">CineWorld</h2></Link>
  <ul className="flex items-center gap-4  max-sm:hidden">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "textBtn bg-gray-800 text-gray-400" : "textBtn"
        }
      >
        Filmlar
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/tv"
        className={({ isActive }) =>
          isActive ? "textBtn bg-gray-800 text-gray-400" : "textBtn"
        }
      >
        Seriallar
      </NavLink>
    </li>
  </ul>
</div>

          <div className="flex items-center gap-3">

            <div className=" iconBtn">
            <IoSearch  className="text-lg"/>
            </div>
            <select  value={language}
  onChange={(e) => setLanguage(e.target.value)} className="textBtn outline-none  ">

  {LANGUAGES.map(lang => (
    <option key={lang.code} value={lang.code} className="bg-gray-900 text-white">
      {lang.label}
    </option>
  ))}


  
</select>
<div className="relative max-sm:hidden">
<div 
onMouseEnter={() => setMenuCategory(true)}
onClick={()=>{
  navigation('/categories')
}}
className="iconBtn">
<CgMenuGridO  className="text-lg"/>
</div>
{
  menuCategory ? <div onMouseLeave={() => setMenuCategory(false)}  className="
  w-48 absolute z-30 top-12 right-0
  bg-gray-800 flex flex-col rounded-2xl
  max-h-80 overflow-auto
 scrollbar-hide
">

{
  genres.map((genre)=>(
 
    <Link to={`/genre/${genre.id}`} className="px-4 py-2 text-sm hover:bg-gray-700 rounded-t-lg  border-b border-gray-700  ">
      {genre.name}
    </Link>

  ))
}

 
  </div> : null
}
</div>

<div  onClick={()=>{
              setIsMenuOpen(true)
            }} className="">

<IoMenu  className="text-3xl p-1   rounded-full text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer"/>

</div>
          </div>
        </div>


        
      </div>


    </div>
  );
}

export default Navbar;
