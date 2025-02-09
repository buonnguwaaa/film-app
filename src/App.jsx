import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'

function App() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
        }
      };

      try {
        // Fetch cả 2 API cùng lúc using Promise.all
        const [popularResponse, topRatedResponse] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
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
      <Header />
      <Banner />
      <MovieList title="Phim Hot" data={popularMovies} />
      <MovieList title="Phim Đề Cử" data={topRatedMovies} />
    </div>
  )
}

export default App