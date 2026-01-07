import React, { useEffect, useState } from 'react'
import { fetchMovies } from './server/api';
import SwiperCard from '../components/SwiperCard';
import { tvSections } from './server/api';
import { useLanguage } from './LanguageContext';
function Tv({setIsLoading}) {

const [moviesBySection, setMoviesBySection] = useState({})

const { language } = useLanguage();

      useEffect(() => {
        const loadSections = async () => {
          setIsLoading(true)
          const result = {}
      
          for (const section of tvSections) {
            result[section.id] = await fetchMovies(section.endpoint,language)
          }
 
      
          setMoviesBySection(result)
          setIsLoading(false)
        }
      
        loadSections()
      }, [language])

      
  return (
    <div className='mt-[100px]'>
        
{tvSections.map(section => (
        <section
          key={section.id}
          className=" max-w-7xl mx-auto sm:px-6 lg:px-8 py-2"
        >
          <SwiperCard
           type="tv"         // section turi
           sectionId={section.id} 
            title={section.title}
            movies={moviesBySection[section.id] || []}
          />
        </section>

      ))}
    </div>
  )
}

export default Tv