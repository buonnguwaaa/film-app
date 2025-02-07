import PropTypes from 'prop-types'

const MovieList = ({title, data}) => {
    return (
        <div className="bg-black p-4 text-white">
            <h2 className='uppercase text-xl mb-2'>{title}</h2>
            <div className='flex items-center space-x-4 '>
                {data.length > 0 && data.map((item) => (
                    <div className='w-[200px] h-[300px] relative group' key={item.id}>
                        <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer'>
                            <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                            <img src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} alt={item.title} className='w-full h-full object-cover' />
                            <div className='absolute bottom-3 left-2 uppercase text-md text-center'>{item.title||item.original_title}</div>
                        </div>                    
                    </div>
                ))}
            </div>
        </div>
    )
}

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
}

export default MovieList