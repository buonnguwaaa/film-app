// hooks/useMovies.js
import { useRef } from 'react'
import useMovieStore from '@/store/movieStore'
import { getPopularMovies, getTopRatedMovies, getMovieDetails, searchMovies } from '@/services/movieService'

const useMovies = () => {
  const { movies, pagination, search, setMovies, setPagination, setSearch } = useMovieStore()
  const searchResultRef = useRef(null)

  const fetchInitialMovies = async () => {
    try {
      const [popularMovies, topRatedMovies] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies()
      ])
      
      setMovies('popular', popularMovies.results)
      setMovies('topRated', topRatedMovies.results)
      setMovies('searched', [])
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const handleSearch = async (term, page = 1) => {
    try {
      if (term !== '') {
        setSearch({ term, isSearching: true })
        const results = await searchMovies(term, page)
        
        setMovies('searched', results.results)
        setPagination({
          currentPage: page,
          totalPages: results.total_pages
        })
        
        searchResultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
      else {
        setSearch({ term, isSearching: false });
        fetchInitialMovies();
      }
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  return {
    movies,
    pagination,
    search,
    searchResultRef,
    handleSearch,
    fetchInitialMovies,
  }
}

export default useMovies