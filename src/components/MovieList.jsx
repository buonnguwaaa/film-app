import { useState } from 'react';

import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
    backgroundColor: 'rgba(110, 103, 104, 1)',
    border: 'none',
    padding: '0',
    paddingTop: '25px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 1000,
    position: 'fixed',
  },
};

const MovieList = ({title, data}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
    
  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
      <div className="bg-black p-8 text-white">
          <h2 className='uppercase text-xl mb-2'>{title}</h2>
          <Carousel responsive={responsive} className='flex items-center space-x-4 '>
              {data.length > 0 && data.map((item) => (
                  <div responsive={responsive} className='w-[200px] h-[300px] relative group' key={item.id} onClick={openModal}>
                      <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer'>
                          <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                          <img src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} alt={item.title} className='w-full h-full object-cover' />
                          <div className='absolute bottom-3 w-full uppercase text-md text-center'>{item.title||item.original_title}</div>
                      </div>                    
                  </div>
              ))}
          </Carousel>
          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
          >
            <div className='relative'>
              <button onClick={closeModal}  className='absolute right-0 top-[-25px] text-white bg-red-500 w-[25px] h-[25px] cursor-pointer'>X</button>
              <ReactPlayer url='https://www.youtube.com/watch?v=YOMQZwqCgtQ' playing/>
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