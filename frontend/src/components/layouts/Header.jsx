import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, 1);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black px-4 py-2">
    <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo & Navigation - Căn trái */}
        <div className="flex items-center space-x-4">
            <h1 className="text-red-700 text-[40px] uppercase font-bold pl-4">MOVIE</h1>
            <nav className="flex space-x-4">
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

        {/* Search - Căn giữa */}
        <form onSubmit={handleSubmit} className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-sm">
            <input 
                type="text" 
                placeholder="Search movie" 
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>

        {/* Login - Căn phải */}
        <div className="flex items-center mr-4">
            <button className="flex items-center text-white hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className='text-lg font-semibold'>Login</span>
            </button>
        </div>
    </div>
</div>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func
}

export default Header;