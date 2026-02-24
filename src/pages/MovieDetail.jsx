import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBasicMovieDetail } from './server/api';
import { useLanguage } from './LanguageContext';

function MovieDetail() {
const {link,id}=useParams()
const  [detail, setDetail] = useState(null);
const { language } = useLanguage();
useEffect(() => {
  fetchBasicMovieDetail(id,language).then((data) => {
    setDetail(data);
    console.log(data);
    
  });
}, [language]);

  return (
    <div>
  <div className="mt-2 max-w-7xl mx-auto">

    
  </div>
    </div>
  )
}

export default MovieDetail