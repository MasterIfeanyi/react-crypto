import React from 'react'
import { FaSearch } from "react-icons/fa"

const SearchBox = ({search, handleSearch, handleSubmit}) => {


  return (
    <div className="row mt-5">
        <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="form-control"
                    value={search}
                    onChange={handleSearch}
                />
                <button 
                    className="btn btn-brand" 
                    type="button" 
                    id="button" >
                    <FaSearch />
                </button>
            </div>
        </form>
    </div>
  )
}

export default SearchBox