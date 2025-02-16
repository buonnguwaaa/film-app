// pages/main/MovieDetails.jsx
import MovieDetails from '@/components/features/movies/MovieDetails/index.jsx'
import { useParams } from 'react-router-dom'

const MovieDetailsPage = () => {
    const { id } = useParams()
    const movieId = Number(id)
    return <MovieDetails id={movieId} />
}

export default MovieDetailsPage