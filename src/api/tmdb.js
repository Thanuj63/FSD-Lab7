import axios from 'axios';

const API_KEY = '68e094699525b18a70bab2f86b1fa706';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for id ${movieId}:`, error);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
