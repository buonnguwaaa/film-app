// pages/Home/index.jsx
import { useEffect } from 'react'
import Banner from '@/components/layouts/Banner'
import MoviesGrid from '@/components/features/movies/MoviesGrid'
import Pagination from '@/components/common/Pagination'
import MoviesCarousel from '@/components/features/movies/MoviesCarousel'
import useMovies from '@/hooks/useMovies'

const Home = () => {
  const {
    movies,
    pagination,
    search,
    searchResultRef,
    handleSearch,
    fetchInitialMovies
  } = useMovies()

  useEffect(() => {
    fetchInitialMovies()
  }, [])

  return (
    <>
      <div ref={searchResultRef} className='scroll-mt-16'>
        {search.isSearching ? (
          <>
            <MoviesGrid data={movies.searched} />
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => handleSearch(search.term, page)}
            />
          </>
        ) : (
          <>
            <Banner />
            <MoviesCarousel title="Phim Hot" data={movies.popular.slice(0, 10)} />
            <MoviesCarousel title="Phim Đề Cử" data={movies.topRated.slice(0, 10)} />
          </>
        )}
      </div>
    </>
  )
}

export default Home