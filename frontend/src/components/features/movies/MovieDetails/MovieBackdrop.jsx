// components/features/movies/MovieDetails/MovieBackdrop.jsx
import PropType from 'prop-types'

const MovieBackdrop = ({ path, dominantColor }) => (
    <>
        <img 
            src={`${import.meta.env.VITE_IMAGE_URL}${path}`} 
            alt="backdrop" 
            className="w-full h-full object-cover absolute top-0 left-0"
            crossOrigin="anonymous"
        />
        <div 
            className="absolute w-full h-full top-0 left-0 inset-0" 
            style={{
                background: `linear-gradient(to right, ${dominantColor}E6, ${dominantColor}CC)`,
            }}
        />
    </>
)

MovieBackdrop.propTypes = {
    path: PropType.string.isRequired,
    dominantColor: PropType.string.isRequired,
}

export default MovieBackdrop