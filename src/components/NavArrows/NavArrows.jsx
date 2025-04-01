import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"



const NavArrows = ({page, handleNextClick, handlePrevClick}) => {


  return (
    <div className="row my-3">
        <div className="col-12 intro">
            <div className="d-flex justify-content-between align-items-center">
                <button 
                    disabled={page <= 1 ? true : false } 
                    onClick={handlePrevClick} 
                    className="btn btn-danger form-button"
                    >
                    <FaArrowLeft /> 
                </button>

                {/* <p data-testid="pageNumber" className="font-weight">Page: {page}</p> */}

                <button disabled={page >= 30 ? true : false } onClick={handleNextClick} className="btn btn-primary form-button"> <FaArrowRight /></button>
            </div>
        </div>
    </div>
  )
}

export default NavArrows