import {useState, useEffect} from 'react'

import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'

function App() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popular_movie_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
        }
      };

      try {
        const response = await fetch(popular_movie_url, options);
        const data = await response.json();
        setPopularMovies(data.results);
        console.log('Popular Movies: ', data.results);
      } catch (error) {
        console.error('Error fetching Popular Movies: ', error);
      }
  }
  const fetchTopRatedMovies = async () => {
    const top_rated_movie_url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
      }
    };

    try {
      const response = await fetch(top_rated_movie_url, options);
      const data = await response.json();
      setTopRatedMovies(data.results);
      console.log('TopMovies: ', data.results);
    } catch (error) {
      console.error('Error fetching Top Rated Movies: ', error);
    }
  }
  fetchPopularMovies();
  fetchTopRatedMovies();
}, []);

  return (
    <div>
      <Header />
      <Banner />
      <MovieList title={"Phim Hot"} data={popularMovies}/>
      <MovieList title={"Phim Đề Cử"} data={topRatedMovies}/>
    </div>
  )
}

export default App
