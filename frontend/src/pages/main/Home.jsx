// pages/Home/index.jsx
import { useEffect } from 'react'
import Banner from '@/components/layouts/Banner'
import MoviesCarousel from '@/components/features/movies/MovieLists/MoviesCarousel'
import useMovies from '@/hooks/useMovies'

const Home = () => {
  const {
    movies,
    fetchInitialMovies
  } = useMovies()

  useEffect(() => {
    fetchInitialMovies()
  }, [])

  return (
    <>
      <Banner />
      <MoviesCarousel title="Phim Hot" data={movies.popular.slice(0, 10)} />
      <MoviesCarousel title="Phim Đề Cử" data={movies.topRated.slice(0, 10)} />
    </>
  )
}

export default Home