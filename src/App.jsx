import { useState, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import Header from './components/layouts/Header'
import Banner from './components/layouts/Banner'
import MovieList from './components/movies/MovieList'
import FindMovie from './components/movies/FindMovie'
import Pagination from './components/common/Pagination'
import { searchMovies, getPopularMovies, getTopRatedMovies } from './services/movieApi'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchResultRef = useRef(null)

  const handleSearch = async (term, page = 1) => {
    setSearchTerm(term);
    
    if (!term) {
      setSearchedMovies([]);
      setIsSearching(false);
      return;
    }

    try {
      const data = await searchMovies(term, page);
      if (data?.results) {
        setSearchedMovies(data.results);
        setIsSearching(true);
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
        searchResultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchedMovies([]);
      setIsSearching(false);
    }
  }

  const handlePageChange = (page) => {
    handleSearch(searchTerm, page);
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const [popularData, topRatedData] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies()
        ]);

        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results);
      } catch (error) {
        console.error('Error fetching initial movies:', error);
      }
    };

    fetchInitialMovies();
  }, []);

  Modal.setAppElement('#root');

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <Banner />
      <div ref={searchResultRef} className='scroll-mt-16'>
        {isSearching && searchedMovies.length > 0 ? (
          <>
            <FindMovie data={searchedMovies}/>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </> 
        ) : (
          <>
            <MovieList title="Phim Hot" data={popularMovies.slice(0, 10)} />
            <MovieList title="Phim Đề Cử" data={topRatedMovies.slice(0, 10)} />
          </>
        )}
      </div>
    </div>
  )
}

export default App