import {useState} from 'react'

const Dots = ({totalPages, currentPage, setCurrentPage}) => {

   
    // Always show 2 dots
    const visibleDots = 2; 

    // Determine the page number for each dot
    const getPageForDot = (dotIndex) => {
        if (dotIndex === 0) {
            // First dot represents the previous page or page 1
            return currentPage === 1 ? 1 : currentPage - 1; 
        }
        if (dotIndex >= 1) {
            // Second dot represents the current page
            return currentPage + 1; 
        }
    };

    const handleDotClick = (dotIndex) => {
        if (dotIndex === 0) {
          // First dot always takes us to page 1
          setCurrentPage(prev => prev - 1);
        //   onPageChange(1);
        } else {
          // Second dot takes us to next page or cycles through pages
          if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            // onPageChange(currentPage + 1);
          } else {
            // If we're on the last page, go back to page 2
            setCurrentPage(prev => prev + 1);
            // onPageChange(2);
          }
        }
    };

    

  return (
    <div className="page-indicator">
        {Array.from({ length: visibleDots }, (_, index) => {

            // if the index is zero, the dot will be representing the firstPage
            const pageNumber = getPageForDot(index);


            // highlight the current dot
            // const isActive = pageNumber === currentPage;

            // First dot is active when on page 1
            // Second dot is active when on any other page (2-10)
            const isActive = (index === 0 && currentPage === 1) || (index === 1 && currentPage > 1);


            return (
                <div
                    key={index}
                    className={`page-dot ${isActive ? 'active' : ''}`}           
                    aria-label={`Page ${pageNumber}`} 
                    // onClick={() => setCurrentPage(pageNumber)}
                    onClick={() => handleDotClick(index)}  
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#0d6efd" : "#ccc",
                        // cursor: "pointer",
                        cursor: (index === 0 && currentPage === 1) ? 'default' : 'pointer',
                        transition: "background-color 0.3s ease"
                    }}
                ></div>
            )
        })}
    </div>   
  )
}

export default Dots