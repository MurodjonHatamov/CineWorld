// api.js

export const API_KEY = "87ea6600c90ed06f2a15fff32ae9ac23";
export const BASE_URL = "https://api.themoviedb.org/3";


  export const fetchMovies = async (endpoint,language="en-US") => {
    try {
      const res = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}`
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      console.error("API error:", err);
      return [];
    }
  };
  



  fetchMovies("/trending/movie/week") // Header
fetchMovies("/movie/popular")       // Ommabop
fetchMovies("/movie/top_rated")     // Eng yaxshi
fetchMovies("/movie/now_playing")   // Hozir kinoteatrda
fetchMovies("/discover/movie")      // Tavsiya

export const fetchCategory = async (language="en-US") => {
    try {
      const res = await fetch(
        `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=${language}`
      );
  
      const data = await res.json();
  
  
      return data.genres; // 👈 MUHIM
    } catch (err) {
      console.error("Category API error:", err);
      return [];
    }
  };
  

  export const fetchBySection = async (type, sectionId, page = 1,language="en-US") => {
    try {
      const endpointMap = {
        movie: {
          1: "/movie/popular",
          2: "/trending/movie/week",
          3: "/movie/top_rated",
          4: "/movie/now_playing",
          5: "/movie/upcoming",
        },
        tv: {
          1: "/tv/popular",
          2: "/trending/tv/week",
          3: "/tv/top_rated",
          4: "/tv/on_the_air",
        },
      };
  
      const endpoint = endpointMap[type][sectionId];
      const res = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}&page=${page}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Section fetch error:", err);
      return { results: [], total_pages: 0 };
    }
  };
  
  


  export const movieSections = [
    { id: 1, title: "Ommabop filmlar", endpoint: "/movie/popular" },
    { id: 2, title: "Trenddagi filmlar", endpoint: "/trending/movie/week" },
    { id: 3, title: "Eng yaxshi filmlar", endpoint: "/movie/top_rated" },
    { id: 4, title: "Yangi filmlar", endpoint: "/movie/now_playing" },
    { id: 5, title: "Yaqinda chiqadigan filmlar", endpoint: "/movie/upcoming" },
  ];

  export const tvSections = [
    { id: 1, title: "Ommabop seriallar", endpoint: "/tv/popular" },
    { id: 2, title: "Trenddagi seriallar", endpoint: "/trending/tv/week" },
    { id: 3, title: "Eng yaxshi seriallar", endpoint: "/tv/top_rated" },
    { id: 4, title: "Hozir namoyishda", endpoint: "/tv/on_the_air" },
  ];


  // src/constants/languages.js
export const LANGUAGES = [
  { code: "uz-UZ", label: "O‘zbekcha 🇺🇿" },
  { code: "ru-RU", label: "Русский 🇷🇺" },
  { code: "en-US", label: "English 🇺🇸" },
];


  

  // ckategorya bo'yicha malumot olish
  export const fetchByGenre = async (type, genreId,language="en-US") => {
    try {
      const endpoint =
        type === "movie"
          ? `/discover/movie?with_genres=${genreId}`
          : `/discover/tv?with_genres=${genreId}`;
  
      const res = await fetch(
        `${BASE_URL}${endpoint}&api_key=${API_KEY}&language=${language}`
      );
      const data = await res.json();
      return data.results;
    } catch (err) {
      console.error("Genre fetch error:", err);
      return [];
    }
  };
  