import PropTypes from 'prop-types';
import { useState } from 'react'
import useMovieStore from '@/store/movieStore'
import useAuthStore from '../../store/authStore';
import useScrollDirection from '@/hooks/useScrollDirection';
import './Header.css'
import { FaSearch } from 'react-icons/fa';
import DropDown from '../common/DropDown'
import AvatarIcon from '../common/AvatarIcon';

const Header = ({ onSearch }) => {
    const [isDropDown, setDropDown] = useState(false)
    const { search, setSearch } = useMovieStore()
    const { isLoggedIn } = useAuthStore()
    const isVisible = useScrollDirection();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search.term);
    };
    console.log('isLoggedIn: ', isLoggedIn)

    const toggleDropDown = () => {
        return setDropDown(!isDropDown)
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 bg-black space-x-4 py-2 transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
                {/* Logo & Navigation - Căn trái */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-red-700 text-[40px] uppercase font-bold pl-4">MOVIE</h1>
                    <nav className="hidden md:flex space-x-4">
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
                <form onSubmit={handleSubmit} className="absolute left-1/2 transform -translate-x-1/2 w-[30%] min-w-[200px] hidden sm:block">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search movie" 
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 pr-10"
                            value={search.term}
                            onChange={(e) => setSearch({ ...search, term: e.target.value })}
                        />
                        <button type="submit" className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {/* Search bar cho màn hình nhỏ */}
                <form onSubmit={handleSubmit} className="sm:hidden w-full max-w-[200px]">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search movie" 
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 pr-10"
                            value={search.term}
                            onChange={(e) => setSearch({ ...search, term: e.target.value })}
                        />
                        <button type="submit" className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            <FaSearch/>
                        </button>
                    </div>
                </form>

                {/* Login - Căn phải */}
                
                { isLoggedIn ? 
                    
                        <button className='flex items-center mr-6 cursor-pointer relative' onClick={toggleDropDown}>
                            <AvatarIcon w={8} h={8}/>
                            <div className="arrow-container">
                                <div className="arrow-down"></div>
                            </div>
                            <div 
                            className={`origin-top-right transition-all duration-300 ${
                                isDropDown && isVisible 
                                    ? 'transform scale-100 opacity-100' 
                                    : 'transform scale-95 opacity-0 pointer-events-none'
                            }`}
                            >
                                <DropDown />
                            </div>
                        </button>
                    :
                    <a className="flex items-center mr-4" href="/auth/login">
                        <button className="flex items-center cursor-pointer text-white hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className='text-lg font-semibold'>Login</span>
                        </button>
                    </a>
                }
                
            </div>
        </div>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func
}

export default Header;