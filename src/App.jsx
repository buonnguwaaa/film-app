import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Header from './components/layouts/Header'
import Banner from './components/layouts/Banner'
import MovieList from './components/movies/MovieList'
import FindMovie from './components/movies/FindMovie'

function App() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])

  const handleSearch = async (searchTerm) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
      }
    };

    if (!searchTerm) {
      setSearchedMovies([]);
      return;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchedMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchedMovies([]);
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
        }
      };

      const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

      try {
        // Fetch cả 2 API cùng lúc using Promise.all
        const [popularResponse, topRatedResponse] = await Promise.all([
          fetch(popularUrl, options),
          fetch(topRatedUrl, options)
        ]);

        const popularData = await popularResponse.json();
        const topRatedData = await topRatedResponse.json();

        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results);

        console.log('Popular Movies:', popularData.results);
        console.log('Top Rated Movies:', topRatedData.results);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  Modal.setAppElement('#root');

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <Banner />
      {searchedMovies ? 
        <FindMovie data={searchedMovies.slice(0,10)} /> : 
        <>
          <MovieList title="Phim Hot" data={popularMovies.slice(0, 10)} />
          <MovieList title="Phim Đề Cử" data={topRatedMovies.slice(0, 10)} />
        </>
      }
      
    </div>
  )
}

export default App