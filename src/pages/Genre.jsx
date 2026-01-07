import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SwiperCard from '../components/SwiperCard';
import { fetchByGenre, movieSections,tvSections } from './server/api';
import { useLanguage } from './LanguageContext';
function Genre({setIsLoading}) {
    const { id } = useParams();
    const [type, setType] = useState("all"); // all | movie | tv
    const [items, setItems] = useState([]); 
    const [itemsBySection, setItemsBySection] = useState({});
    const { language } = useLanguage();


useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
      const data = {};
  
      if (type === "all" || type === "movie") {
        for (const section of movieSections) {
          const res = await fetchByGenre("movie", id,language);
          data[`movie-${section.id}`] = res;
        }
      }
  
      if (type === "all" || type === "tv") {
        for (const section of tvSections) {
          const res = await fetchByGenre("tv", id,language);
          data[`tv-${section.id}`] = res;
        }
      }
  
      setItemsBySection(data);
    setIsLoading(false);
      
    };
  
    loadData();
  }, [id, type,language]);
  


  return (
    <div>
        <div className="mt-25 max-w-7xl mx-auto px-4">
<h2 className='text-3xl mb-4'>Genre</h2>
<div className="flex items-center gap-3">
    <button onClick={
        ()=>{

            setType("all")
        }
    }  className={`textBtn px-4 ${type === "all" && "bg-gray-700"}`}>Barchasi</button>
    <button onClick={
        ()=>{

            setType("movie")
        }
    }    className={`textBtn px-4 ${type === "movie" && "bg-gray-700"}`}>Filmlar</button>
    <button onClick={
        ()=>{

            setType("tv")
        }
    } className={`textBtn px-4 ${type === "tv" && "bg-gray-700"}`}>Seriallar</button>
</div>
        </div>
        

    {/* MOVIE SECTIONLAR */}
{(type === "all" || type === "movie") &&
  movieSections.map(section => (
    <section
      key={`movie-${section.id}`}
      className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-2"
    >
      <SwiperCard
        title={section.title}
        movies={itemsBySection[`movie-${section.id}`] || []}
        type="movie"         // section turi
        sectionId={section.id} 
      />
    </section>
))}

{/* TV SECTIONLAR */}
{(type === "all" || type === "tv") &&
  tvSections.map(section => (
    <section
      key={`tv-${section.id}`}
      className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-2"
    >
      <SwiperCard
       type="tv"         // section turi
       sectionId={section.id} 
        title={section.title}
        movies={itemsBySection[`tv-${section.id}`] || []}
      />
    </section>
))}


    </div>
  )
}

export default Genre