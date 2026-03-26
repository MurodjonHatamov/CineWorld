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
    const randomPage =
      options.randomPage
        ? Math.floor(Math.random() * (options.maxPage || 10)) + 1
        : options.page || 1;
try{
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}&page=${randomPage}`);
  const data = await response.json();
  return data.results || [];
}catch(e){
  console.error("Error fetching movies:", e);
  return [];
}
};

  




// Bu kategoriya bo'yicha malumot olish
export const fetchCategory = async (language="en-US",type = "movie") => {
    try {
      const res = await fetch(
        `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${language}`
      );
      const data = await res.json();
      return data.genres; 
    } catch (err) {
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
  // export const fetchByGenre = async (type, genreId,language="en-US") => {
  //   try {
  //     const endpoint =
  //       type === "movie"
  //         ? `/discover/movie?with_genres=${genreId}`
  //         : `/discover/tv?with_genres=${genreId}`; 
  
  //     const res = await fetch(
  //       `${BASE_URL}${endpoint}&api_key=${API_KEY}&language=${language}sort_by=popularity.desc`
  //     );
  //     const data = await res.json();
  //     return data.results;
  //   } catch (err) {
  //     console.error("Genre fetch error:", err);
  //     return [];
  //   }
  // };
  export const fetchByGenre = async (
    type,         // "movie" | "tv"
    genreId,
    language = "en-US",
    options = {}
  ) => {
    try {
      const {
        page = 1,
        sort_by = "popularity.desc",
        include_adult = false,
  
        year,              // movie uchun: 2024
        first_air_year,    // tv uchun: 2024
        vote_gte,          // min rating: 7
        original_language, // masalan: "en", "ru", "ko"
      } = options;
  
      const endpoint =
        type === "movie"
          ? `/discover/movie?with_genres=${genreId}`
          : `/discover/tv?with_genres=${genreId}`;
  
      const params = new URLSearchParams();
      params.set("api_key", API_KEY);
      params.set("language", language);
      params.set("page", String(page));
      params.set("sort_by", sort_by);
      params.set("include_adult", include_adult ? "true" : "false");
  
      // min rating
      if (vote_gte !== undefined && vote_gte !== null && vote_gte !== "")
        params.set("vote_average.gte", String(vote_gte));
  
      // original language (ISO 639-1)
      if (original_language) params.set("with_original_language", original_language);
  
      // year filters
      if (type === "movie" && year) params.set("year", String(year));
      if (type === "tv" && first_air_year) params.set("first_air_date_year", String(first_air_year));
  
      const url = `${BASE_URL}${endpoint}&${params.toString()}`;
  
      const res = await fetch(url);
      const data = await res.json();
  
      return {
        results: data.results || [],
        page: data.page || page,
        total_pages: data.total_pages || 1,
        total_results: data.total_results || 0,
      };
    } catch (err) {
      console.error("Genre fetch error:", err);
      return { results: [], page: 1, total_pages: 1, total_results: 0 };
    }
  };
  














export const fetchBasicMovieDetail = async (id, link, language = 'en-US') => {
  try {
    const [
      detailRes,
      creditsRes,
      videosRes,
      imagesRes,
      keywordsRes,
      reviewsRes,
      similarRes
    ] = await Promise.all([
      fetch(`${BASE_URL}/${link}/${id}?api_key=${API_KEY}&language=${language}`),
      fetch(`${BASE_URL}/${link}/${id}/credits?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/${link}/${id}/videos?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/${link}/${id}/images?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/${link}/${id}/keywords?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/${link}/${id}/reviews?api_key=${API_KEY}&language=${language}`),
      fetch(`${BASE_URL}/${link}/${id}/similar?api_key=${API_KEY}&language=${language}`)

    ]);

    const detail = await detailRes.json();
    const credits = await creditsRes.json();
    const videos = await videosRes.json();
    const images = await imagesRes.json();
    const keywords = await keywordsRes.json();
    const reviews = await reviewsRes.json();
    const similar = await similarRes.json();

    // 🎬 Trailer tanlab olish
    const trailer =
      videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
      videos.results.find(v => v.site === 'YouTube');

    return {
      detail,
      cast: credits.cast.slice(0, 12), 
      trailer,
      images: images.backdrops.slice(0, 10),
      keywords: keywords.keywords,
      reviews: reviews.results,
      similar: similar.results

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




