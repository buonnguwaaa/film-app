import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const MovieItem = ({ item }) => {
    const navigate = useNavigate(); // Di chuyển useNavigate ra ngoài

    const handleClickMovie = (movie) => {
        navigate(`/movie/${movie.id}`);
    }

    return (
        <div className='w-[200px] aspect-[2/3] relative group' 
            onClick={() => handleClickMovie(item)}>
            <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer'>
                <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                <img src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} 
                     alt={item.title} 
                     className='w-full h-full object-cover' 
                />
                <div className='absolute bottom-3 w-full uppercase text-md text-center'>
                    {item.title || item.original_title}
                </div>
            </div>                    
        </div>
    );
}

MovieItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default MovieItem;