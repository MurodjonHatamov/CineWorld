
import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Tv from './pages/Tv';
import { fetchCategory } from './pages/server/api';
import Categories from './pages/Categories';
import Genre from './pages/Genre';
import Loader from './components/Loader';
import MovieDetail from './pages/MovieDetail';
import SectionDetail from './pages/SectionDetail';
import { LanguageProvider } from './pages/LanguageContext';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    fetchCategory()
    
  },[])



  return (
    <>  
    <BrowserRouter>
<LanguageProvider>
<Navbar setIsLoading={setIsLoading}/>
<Sidebar isLoading={isLoading} />
    <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
    <Routes>
      <Route path="/" element={<Home  setIsLoading={setIsLoading}/>}/>
      <Route path="/tv" element={<Tv  setIsLoading={setIsLoading}/>}/>
      <Route path="/categories" element={<Categories  setIsLoading={setIsLoading}/>}/>
      <Route path="/genre/:id" element={<Genre  setIsLoading={setIsLoading}/>}/>
      <Route path="/movie" element={<MovieDetail setIsLoading={setIsLoading}/>}/>
      <Route path="/section/:type/:id" element={<SectionDetail setIsLoading={setIsLoading}/>}/>
    </Routes>
<Footer/>
</LanguageProvider>

    </BrowserRouter>
    </>
  )
}

export default App
