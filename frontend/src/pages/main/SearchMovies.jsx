// pages/movies/SearchPage.jsx
import { useEffect, useRef } from 'react'
import MoviesGrid from '@/components/features/movies/MovieLists/MoviesGrid'
import Pagination from '@/components/common/Pagination'
import useMovies from '@/hooks/useMovies'
import { useSearchParams } from 'react-router-dom'

const SearchMovies = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('query')
  const page = searchParams.get('page') || 1
  
  const {
    movies,
    pagination,
    search,
    searchResultRef,
    handleSearch,
  } = useMovies()

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, page)
    }
  }, [searchQuery, page])

  return (
    <div ref={searchResultRef} className='scroll-mt-16'>
      <MoviesGrid data={movies.searched} />
      <Pagination
        currentPage={Number(pagination.currentPage)}
        totalPages={Number(pagination.totalPages)}
        onPageChange={(page) => handleSearch(search.term, Number(page))}
      />
    </div>
  )
}

export default SearchMovies