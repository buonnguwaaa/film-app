import PropTypes from 'prop-types';
import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= totalPages)) {
      setInputPage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPage && Number(inputPage) !== currentPage) {
      onPageChange(Number(inputPage));
    }
  };

  return (
    <div className="bg-black flex justify-center items-center gap-4 py-8">
      <button 
        onClick={() => {
          onPageChange(currentPage - 1);
          setInputPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-700 text-white rounded disabled:opacity-50 disabled:hover:bg-red-700 disabled:cursor-not-allowed hover:bg-red-800 transition-colors"
      >
        Previous
      </button>
      
      <form onSubmit={handleSubmit} onBlur={handleSubmit} className="flex items-center bg-red-800 rounded px-1 py-1">
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          className="w-12 bg-transparent text-white text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min={1}
          max={totalPages}
        />
        <span className="text-white font-medium px-1">/</span>
        <span className="text-white font-medium w-12 text-center">
          {totalPages}
        </span>
      </form>
      
      <button 
        onClick={() => {
          onPageChange(currentPage + 1);
          setInputPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-700 text-white rounded disabled:opacity-50 disabled:hover:bg-red-700 disabled:cursor-not-allowed hover:bg-red-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;