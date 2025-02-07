import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

const MovieList = ({title, data}) => {
    return (
        <div className="bg-black p-8 text-white">
            <h2 className='uppercase text-xl mb-2'>{title}</h2>
            <Carousel responsive={responsive} className='flex items-center space-x-4 '>
                {data.length > 0 && data.map((item) => (
                    <div responsive={responsive} className='w-[200px] h-[300px] relative group' key={item.id}>
                        <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer'>
                            <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                            <img src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} alt={item.title} className='w-full h-full object-cover' />
                            <div className='absolute bottom-3 w-full uppercase text-md text-center'>{item.title||item.original_title}</div>
                        </div>                    
                    </div>
                    
                ))}
            </Carousel>
        </div>
    )
}

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
}

export default MovieList