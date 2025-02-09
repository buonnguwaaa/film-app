import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel';
import MovieItem from './MovieItem';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
    border: 'none',
    padding: '0',
    paddingTop: '25px',
    borderRadius: '8px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
    position: 'fixed',
  },
};

const MovieList = ({title, data = []}) => {
  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-black p-8 text-white">
      <h2 className='uppercase text-xl mb-2'>{title}</h2>
      <Carousel responsive={responsive} className='flex items-center space-x-4'>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <MovieItem key={item.id} item={item} />
          ))
        ) : (
          <div>No movies available</div>
        )}
      </Carousel>
    </div>
  )
}

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
}

export default MovieList