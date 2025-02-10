import PropTypes from 'prop-types';
import MovieItem from './MovieItem';

const FindMovie = ({ data = [] }) => {
    console.log(data);
    return (
        <div className="bg-black p-8 text-white">
            <h2 className='uppercase text-xl mb-2'>Kết quả tìm kiếm</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <MovieItem key={item.id} item={item} />
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8">
                        Không tìm thấy kết quả phù hợp
                    </div>
                )}
            </div>
        </div>
    );
};

FindMovie.propTypes = {
    data: PropTypes.array
}

export default FindMovie;