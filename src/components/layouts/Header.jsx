import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-4 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-red-700 text-[40px] uppercase font-bold pl-3">Movie</h1>
                <nav className="flex items-center space-x-4">
                    <a href="/" className="text-white text-lg font-semibold mx-2">Home</a>
                    <a href="/" className="text-white text-lg font-semibold mx-2">About</a>
                    <a href="/" className="text-white text-lg font-semibold mx-2">Contact</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <input 
                    type="text" 
                    placeholder=" Search" 
                    className="bg-amber-50 text-black rounded"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}/>
                <button className="text-white bg-red-700 p-2 rounded" onClick={() => onSearch(searchTerm)}>Search</button>
            </div>
        </div>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func
}

export default Header;