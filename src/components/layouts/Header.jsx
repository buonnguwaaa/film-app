import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, 1);
    };

    return (
        <div className="container mx-auto grid grid-cols-12 p-4 bg-black items-center fixed z-9999 w-full">
            <div className="col-span-3 flex items-center space-x-4">
                <div className=" flex items-center space-x-4">
                    <h1 className="text-red-700 text-[40px] uppercase font-bold pl-3">Movie</h1>
                </div>
                <nav className="flex items-center space-x-4">
                    <a href="/" className="text-white text-lg font-semibold mx-2 hover:text-red-500 transition-colors duration-300 relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/" className="text-white text-lg font-semibold mx-2 hover:text-red-500 transition-colors duration-300 relative group">
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/" className="text-white text-lg font-semibold mx-2 hover:text-red-500 transition-colors duration-300 relative group">
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </nav>
            </div>
            <form onSubmit={handleSubmit} className="col-span-6 flex items-center justify-center space-x-4">
                <input 
                    type="text" 
                    placeholder="Search movie" 
                    className="w-2/3 bg-gray-700 text-amber-50 rounded px-3 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <div className="col-span-3 flex items-center justify-end mr-4">
                <button className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-lg font-semibold">Login</span>
                </button>
            </div>
        </div>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func
}

export default Header;