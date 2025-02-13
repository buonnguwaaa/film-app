import { useRef } from 'react'
import useMovieStore from '../store/movieStore'
import { getPopularMovies, getTopRatedMovies, searchMovies } from '../services/movieService'

const useMovies = () => {
  const { movies, setMovies, pagination, setPagination, search, setSearch } = useMovieStore()
  const searchResultRef = useRef(null)

  const handleSearch = async (term, page = 1) => {
    setSearch({ term, isSearching: !!term })
    if (!term) return

    try {
      const data = await searchMovies(term, page)
      if (data?.results) {
        setMovies('searched', data.results)
        setPagination({ currentPage: data.page, totalPages: data.total_pages })
        searchResultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (error) {
      console.error(error)
      setMovies('searched', [])
      setSearch({ ...search, isSearching: false })
    }
  }

  const fetchInitialMovies = async () => {
    try {
      const [popularData, topRatedData] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies()
      ])
      
      setMovies('popular', popularData.results)
      setMovies('topRated', topRatedData.results)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    movies,
    pagination,
    search,
    searchResultRef,
    handleSearch,
    fetchInitialMovies
  }
}

export default useMovies