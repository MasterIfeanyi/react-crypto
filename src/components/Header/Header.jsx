import React from 'react'
import "./Header.css"

const Header = () => {
    return (
        <header className="text-white p-3 shadow my-header">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <img src="./Bitcoin.png" style={{width: "30px", height: "30px"}} alt="" />
                        <h1 className="h5 mb-0 fw-bold">CoinsNest</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header