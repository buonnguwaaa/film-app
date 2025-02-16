import PropType from 'prop-types'

// components/features/movies/MovieDetails/MovieInfo.jsx
const MovieInfo = ({ movie }) => (
    <div className="flex flex-col w-[70%] space-y-5 z-10 p-4">
        <h2 className="text-white font-bold text-3xl">{movie.title}</h2>
        <div className="facts">
            <span className="certification">PG</span>
            <span className="release-date">{movie.release}</span>
            <span className="genres before:content-['•'] before:p-2 before:text-black">
                {movie.genres.map((genre, index) => (
                    <span key={index}>
                        {genre.name}{index < movie.genres.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </span>
            <span className="duration before:content-['•'] before:p-2 before:text-black">
                {movie.runtime} mins
            </span>
        </div>
        <div className="text-gray-850 w-[50%] italic">{movie.tagline}</div>
        <div className="overview text-white">
            <h3 className="text-lg font-bold">Overview</h3>
            <div>{movie.overview}</div>
        </div>
    </div>
)

MovieInfo.propTypes = {
    movie: PropType.object.isRequired,
}

export default MovieInfo