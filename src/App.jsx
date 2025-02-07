import {useState, useEffect} from 'react'

import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
        console.log('Movies: ', data.results);
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
  }
  fetchMovies();
}, []);

  return (
    <div>
      <Header />
      <Banner />
      <MovieList title={"Phim Hot"} data={movies.slice(0,5)}/>
    </div>
  )
}

export default App
