// hooks/useMovieTrailer.js
import { useState } from 'react'

const useMovieTrailer = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const openModal = (url) => {
        setIsOpen(true)
        setTrailerUrl(url)
    }

    const closeModal = () => {
        setIsOpen(false)
        setTrailerUrl('')
    }

    const handleClickPoster = async (movie) => {
        openModal('')
        setIsLoading(true)
        
        try {
            const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
                }
            })
            const data = await response.json()
            
            if (data.results?.length > 0) {
                setTrailerUrl(`https://www.youtube.com/watch?v=${data.results[0].key}`)
            }
        } catch (error) {
            console.error('Error fetching Movie Video: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        modalIsOpen,
        trailerUrl,
        isLoading,
        openModal,
        closeModal,
        handleClickPoster
    }
}

export default useMovieTrailer