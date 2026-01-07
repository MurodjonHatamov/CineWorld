import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchCategory, LANGUAGES } from "../pages/server/api";
import { useLanguage } from "../pages/LanguageContext";

function Navbar({setIsLoading}) {
const [isSearch,setIsSearch]=useState(false)
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
  <ul className="flex items-center gap-4">
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

            <div className=" iconBtn" onClick={()=>{setIsSearch(!isSearch)}}>
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
<div className="relative">
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


          </div>
        </div>


        {
    isSearch &&    <div className="   bg-gray-800 w-2xl  absolute z-30 top-20  left-70 flex justify-center p-5   rounded-2xl   ">
    <input
      type="text"
      placeholder="Search..."
      className="
        outline
        outline-2
        border border-gray-700
        outline-transparent
        focus:outline-blue-500
        rounded-md
        px-3
        py-2
        transition
        w-full
      "
    />
    
    </div>
}
      </div>


    </div>
  );
}

export default Navbar;
