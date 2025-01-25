import React, { JSX } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-text text-white' : 'bg-gray-200'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center mt-4 space-x-2">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-text text-white'}`}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                    currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-text text-white'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
