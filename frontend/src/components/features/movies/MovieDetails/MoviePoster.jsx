import PropType from 'prop-types'
import IconPlay from '@/assets/play-button.png'

// components/features/movies/MovieDetails/MoviePoster.jsx
const MoviePoster = ({ movie, onPosterClick }) => (
    <div className="w-[30%] flex items-center justify-center z-10">
        <div className="w-[300px] h-[400px] relative group cursor-pointer" 
             onClick={() => onPosterClick(movie)}>
            <img 
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`} 
                alt="poster" 
                className="w-full h-full object-cover"
            /> 
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"> 
                <img src={IconPlay} alt="play" className="w-16 h-16"/>
            </div>
        </div>
    </div>
)

MoviePoster.propTypes = {
    movie: PropType.object.isRequired,
    onPosterClick: PropType.func.isRequired,
}

export default MoviePoster