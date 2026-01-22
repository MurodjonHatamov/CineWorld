// api.js

export const API_KEY = "87ea6600c90ed06f2a15fff32ae9ac23";
export const BASE_URL = "https://api.themoviedb.org/3";
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
  { id: 4, title: "Bugun efirga uzatilmoqda", endpoint: "/tv/airing_today" },
  { id: 5, title: "Hozir namoyishda", endpoint: "/tv/on_the_air" },
];


// src/constants/languages.js
export const LANGUAGES = [
{ code: "uz-UZ", label: "Uz" },
{ code: "ru-RU", label: "Rus" },
{ code: "en-US", label: "Eng" },
];


// Home and Tv
export const fetchMovies = async (
  endpoint,
  language = "en-US",
  options = {}
) => {
  try {
    const randomPage =
      options.randomPage
        ? Math.floor(Math.random() * (options.maxPage || 10)) + 1
        : options.page || 1;

    const res = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}&page=${randomPage}`
    );

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};

  





export const fetchCategory = async (language="en-US",type = "movie") => {
    try {
      const res = await fetch(
        `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${language}`
      );
  
      const data = await res.json();
  
  
      return data.genres; 
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
  














export const fetchBasicMovieDetail = async (id, language = 'en-US') => {
  try {
    const [
      detailRes,
      creditsRes,
      videosRes,
      similarRes
    ] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`),
      fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${language}`)
    ]);

    const detail = await detailRes.json();
    const credits = await creditsRes.json();
    const videos = await videosRes.json();
    const similar = await similarRes.json();

    // 🎬 Trailer tanlab olish
    const trailer =
      videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
      videos.results.find(v => v.site === 'YouTube');

    return {
      detail,
      cast: credits.cast.slice(0, 12), // faqat eng muhimlari
      trailer, // bitta trailer
      similar: similar.results.slice(0,5)
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};




export const searchMulti = async (query, language = "en-US", page = 1) => {
  try {
    const q = encodeURIComponent(query);

    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${language}&query=${q}&page=${page}&include_adult=false`
    );

    const data = await res.json();
    return {
      results: data.results || [],
      page: data.page || 1,
      total_pages: data.total_pages || 1,
      total_results: data.total_results || 0,
    };
  } catch (e) {
    console.error("Search error:", e);
    return { results: [], page: 1, total_pages: 1, total_results: 0 };
  }
};


