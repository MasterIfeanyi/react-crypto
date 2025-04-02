import {useState} from 'react'

const Dots = ({totalPages, onPageChange, currentPage, setCurrentPage}) => {

   
    // Always show 2 dots
    const visibleDots = 2; 

    // Determine the page number for each dot
    const getPageForDot = (dotIndex) => {
        if (dotIndex === 0) {
            return currentPage === 1 ? 1 : currentPage - 1; // First dot represents the previous page or page 1
        }
        if (dotIndex === 1) {
            // Second dot represents the current page
            // return currentPage === totalPages ? totalPages : currentPage + 1; 
            return currentPage + 1;
        }
    };

    // const handlePageChange = (pageNumber) => {
    //     if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid page numbers
    //     setCurrentPage(pageNumber); // Update the active page
    //     onPageChange(pageNumber); // Notify parent component of the page change
    // };

    

  return (
    <div className="page-indicator">
        {Array.from({ length: visibleDots }, (_, index) => {

            // if the index is zero, the dot will be representing the firstPage
            const pageNumber = getPageForDot(index);

            // highlight the current dot
            const isActive = pageNumber === currentPage;

            


            return (
                <div
                    key={index}
                    className={`page-dot ${isActive ? 'active' : ''}`}           
                    aria-label={`Page ${pageNumber}`} 
                    onClick={() => setCurrentPage(pageNumber)}  
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#0d6efd" : "#ccc",
                        cursor: "pointer",
                    }}
                ></div>
            )
        })}
    </div>   
  )
}

export default Dots