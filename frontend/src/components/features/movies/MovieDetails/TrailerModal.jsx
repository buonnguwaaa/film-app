// components/features/movies/MovieDetails/TrailerModal.jsx
import Modal from 'react-modal'
import ReactPlayer from 'react-player'
import PropType from 'prop-types'
import Loading from '../../../common/Loading'

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

const TrailerModal = ({ isOpen, onClose, trailerUrl, isLoading }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Movie Trailer"
    >
        <div className='relative'>
            <button 
                onClick={onClose} 
                className='absolute right-0 top-[-25px] text-white hover:bg-red-600 transition-colors bg-red-400 w-[25px] h-[25px] cursor-pointer rounded'
            >
                X
            </button>
            
            <div className='w-[640px] h-[360px]'>
            {isLoading ? (
                <Loading />
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
        </div>
    </Modal>
)

TrailerModal.propTypes = {
    isOpen: PropType.bool.isRequired,
    onClose: PropType.func.isRequired,
    trailerUrl: PropType.string,
    isLoading: PropType.bool.isRequired,
}

export default TrailerModal