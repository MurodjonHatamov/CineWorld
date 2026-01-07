import React, { useEffect, useState } from 'react'
import HeaderSlider from '../components/HeaderSlider'
import SwiperCard from '../components/SwiperCard'
import { fetchMovies } from './server/api'
import { movieSections } from './server/api'
import { useLanguage } from './LanguageContext'

function Home({setIsLoading}) {


const [moviesBySection, setMoviesBySection] = useState({})
const [popularMovies, setPopularMovies] = useState([])

const { language } = useLanguage();

useEffect(() => {
  const loadSections = async () => {
setIsLoading(true)

    const result = {}

    for (const section of movieSections) {
      result[section.id] = await fetchMovies(section.endpoint,language)
    }

    setMoviesBySection(result)
    setIsLoading(false)
  }

  loadSections()
}, [language])



  return (
    <div >
<div className="mt-2 max-w-7xl mx-auto">
 <HeaderSlider/>
</div>

{movieSections.map(section => (
        <section
          key={section.id}
          className=" max-w-7xl mx-auto sm:px-6 lg:px-8 py-2"
        >
          <SwiperCard
            title={section.title}
            movies={moviesBySection[section.id] || []}
            type="movie"         // section turi
            sectionId={section.id} 
          />
        </section>

      ))}





    </div>
  )
}

export default Home