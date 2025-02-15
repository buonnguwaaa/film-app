import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FastAverageColor } from 'fast-average-color'
import { getMovieDetails } from '@/services/movieService'
import PropType from 'prop-types'
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import IconPlay from "@/assets/play-button.png"
import './MovieDetails.css'

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

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [dominantColor, setDominantColor] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams()

    const openModal = (trailerUrl) => {
        setIsOpen(true);
        setTrailerUrl(trailerUrl);
    }

    const closeModal = () => {
        setIsOpen(false);
        setTrailerUrl('');
    }

    const handleClickPoster = async (movie) => {
        openModal('');  // Mở modal trước với URL rỗng
        setIsLoading(true);
        
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const trailerUrl = `https://www.youtube.com/watch?v=${data.results[0].key}`;
                setTrailerUrl(trailerUrl);
            }
        } catch (error) {
            console.error('Error fetching Movie Video: ', error);
        } finally {
            setIsLoading(false);
        }
    }
    
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
    }, [])

    if (loading) return <div>Loading...</div>
    if (!movieDetails) return null

    return (
        <>
            <div className="w-full h-[585px] bg-center bg-no-repeat bg-cover relative pt-[83px]">
                <img 
                    src={`${import.meta.env.VITE_IMAGE_URL}${movieDetails.backdrop_path}`} 
                    alt="backdrop" 
                    className="w-full h-full object-cover absolute top-0 left-0"
                    crossOrigin="anonymous"
                />
                <div 
                    className="absolute w-full h-full top-0 left-0 inset-0" 
                    style={{
                        background: `linear-gradient(to right, ${dominantColor}E6, ${dominantColor}CC)`,
                        // E6 và CC là giá trị opacity hex (90% và 80%)
                    }}>
                </div>
                <div className="flex w-full h-full items-center justify-center space-x-[30px] p-4">
                    <div className="w-[30%] flex items-center justify-center z-10">
                        <div className="w-[300px] h-[400px] relative group cursor-pointer" onClick={() => handleClickPoster(movieDetails)}>
                            <img src={`${import.meta.env.VITE_IMAGE_URL}${movieDetails.poster_path}`} alt="poster" className="w-full h-full object-cover"/> 
                            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"> 
                                <img src={IconPlay} alt="play" className="w-16 h-16"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[70%] space-y-5 z-10 p-4">
                        <h2 className="text-white font-bold text-3xl">{`${movieDetails.title}`}</h2>
                        <div className="facts">
                            <span className="certification">PG</span>
                            <span className="release-date">{movieDetails.release}</span>
                            <span className="genres before:content-['•'] before:p-2  before:text-black">
                                {movieDetails.genres.map((genre, index) => (
                                    <span key={index}>
                                        {genre.name}{index < movieDetails.genres.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </span>
                            <span className="duration before:content-['•'] before:p-2 before:text-black">{movieDetails.runtime} mins</span>
                        </div>
                        <div className="text-gray-850 w-[50%] italic">{movieDetails.tagline}</div>
                        <div className="overview text-white">
                            <h3 className="text-lg font-bold">Overview</h3>
                            <div>{movieDetails.overview}</div>
                        </div>

                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Movie Trailer"
            >
                <div className='relative'>
                    <button onClick={closeModal} 
                            className='absolute right-0 top-[-25px] text-white hover:bg-red-600 transition-colors bg-red-400 w-[25px] h-[25px] cursor-pointer rounded'>
                        X
                    </button>
                    
                    {isLoading ? (
                        <div className='w-[640px] h-[360px] flex items-center justify-center bg-gray-800'>
                            <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500'></div>
                        </div>
                    ) : trailerUrl ? (
                        <ReactPlayer 
                            url={trailerUrl} 
                            playing 
                            width="640px"
                            height="360px"
                            controls={true}
                        />
                    ) : (
                        <div className='w-[640px] h-[360px] flex items-center justify-center bg-gray-800 text-white'>
                            Không tìm thấy trailer
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}

MovieDetails.propTypes = {
    id: PropType.number
}

export default MovieDetails;