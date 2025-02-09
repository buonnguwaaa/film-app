import { useState } from 'react';
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
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
 const [modalIsOpen, setIsOpen] = useState(false);
 const [trailerUrl, setTrailerUrl] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const openModal = (trailerUrl) => {
   setIsOpen(true);
   setTrailerUrl(trailerUrl);
 }

 const closeModal = () => {
   setIsOpen(false);
   setTrailerUrl('');
 }

 const handleClickMovie = async (movie) => {
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
       setIsLoading(false);    
     } else {
       console.log('No trailer available');
       closeModal();
     }
   }
   catch (error) {
     console.error('Error fetching Movie Video: ', error);
     closeModal();
   }
 }

 if (!data) return <div className="text-white">Loading...</div>;

 return (
   <div className="bg-black p-8 text-white">
     <h2 className='uppercase text-xl mb-2'>{title}</h2>
     <Carousel responsive={responsive} className='flex items-center space-x-4'>
       {Array.isArray(data) && data.length > 0 ? (
         data.map((item) => (
           <div className='w-[200px] h-[300px] relative group' 
                key={item.id} 
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
         ))
       ) : (
         <div>No movies available</div>
       )}
     </Carousel>
     
     <Modal
       isOpen={modalIsOpen}
       onRequestClose={closeModal}
       style={customStyles}
       contentLabel="Movie Trailer"
     >
       <div className='relative'>
         <button onClick={closeModal} 
                 className='absolute right-0 top-[-25px] text-white hover:bg-red-600 transition-colors bg-red-500 w-[25px] h-[25px] cursor-pointer rounded'>
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
   </div>
 )
}

MovieList.propTypes = {
 title: PropTypes.string,
 data: PropTypes.array
}

export default MovieList