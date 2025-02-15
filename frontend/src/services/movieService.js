const BASE_URL = 'https://api.themoviedb.org/3';

const getOptions = () => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
  }
});

export const searchMovies = async (query, page = 1) => {
  if (!query) return null;
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`,
    getOptions()
  );
  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US`,
    getOptions()
  );
  return response.json();
}

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    getOptions()
  );
  return response.json();
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
    getOptions()
  );
  return response.json();
};