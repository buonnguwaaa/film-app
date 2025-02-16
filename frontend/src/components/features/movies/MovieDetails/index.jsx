// components/features/movies/MovieDetails/index.jsx
import { useState, useEffect } from 'react'
import { FastAverageColor } from 'fast-average-color'
import { getMovieDetails } from '@/services/movieService'
import PropType from 'prop-types'
import MoviePoster from './MoviePoster'
import MovieInfo from './MovieInfo'
import MovieBackdrop from './MovieBackdrop'
import TrailerModal from './TrailerModal'
import useMovieTrailer from '@/hooks/useMovieTrailer'
import './MovieDetails.css'

const MovieDetails = ({ id }) => {
    const [movieDetails, setMovieDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [dominantColor, setDominantColor] = useState('')
    const { modalIsOpen, trailerUrl, isLoading, openModal, closeModal, handleClickPoster } = useMovieTrailer()

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(id)
                if (data) {
                    setMovieDetails(data)
                    const fac = new FastAverageColor()
                    const backdropImage = `${import.meta.env.VITE_IMAGE_URL}${data.backdrop_path}`
                    const color = await fac.getColorAsync(backdropImage)
                    setDominantColor(color.hex)
                }
            } catch (error) {
                console.error("Error fetching movie details:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMovieDetails()
    }, [id])

    if (loading) return <div>Loading...</div>
    if (!movieDetails) return null

    return (
        <>
            <div className="w-full h-[585px] bg-center bg-no-repeat bg-cover relative pt-[83px]">
                <MovieBackdrop 
                    path={movieDetails.backdrop_path} 
                    dominantColor={dominantColor} 
                />
                <div className="flex w-full h-full items-center justify-center space-x-[30px] p-4">
                    <MoviePoster 
                        movie={movieDetails} 
                        onPosterClick={handleClickPoster} 
                    />
                    <MovieInfo movie={movieDetails} />
                </div>
            </div>
            <TrailerModal 
                isOpen={modalIsOpen}
                onClose={closeModal}
                trailerUrl={trailerUrl}
                isLoading={isLoading}
            />
        </>
    )
}

MovieDetails.propTypes = {
    id: PropType.number.isRequired
}

export default MovieDetails