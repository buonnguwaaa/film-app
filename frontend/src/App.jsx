import { useEffect } from 'react'
import Modal from 'react-modal'
import Header from './components/layouts/Header'
import Banner from './components/layouts/Banner'
import MoviesGrid from './components/features/movies/MoviesGrid'
import Pagination from './components/common/Pagination'
import MoviesCarousel from './components/features/movies/MoviesCarousel'
import useMovies from './hooks/useMovies'

function App() {
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

  Modal.setAppElement('#root')

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Banner />
      <div ref={searchResultRef} className='scroll-mt-16'>
        {search.isSearching && movies.searched.length > 0 ? (
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
            <MoviesCarousel title="Phim Hot" data={movies.popular.slice(0, 10)} />
            <MoviesCarousel title="Phim Đề Cử" data={movies.topRated.slice(0, 10)} />
          </>
        )}
      </div>
    </div>
  )
}

export default App