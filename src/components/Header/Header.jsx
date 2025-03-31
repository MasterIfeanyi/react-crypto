import React from 'react'
// import { faSearch, faPhone, faUser, faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { Search, Shield, Bell, Menu, AlertTriangle, FileText, Clock, MessageSquare, ChevronRight } from "lucide-react"
// import { Card, Badge, Button, Form } from "react-bootstrap"
import "./Header.css"

const Header = () => {
    return (
        <header className="text-white p-3 shadow my-header">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <img src="./Bitcoin.png" style={{width: "30px", height: "30px"}} alt="" />
                    <h1 className="h5 mb-0 fw-bold">CoinsNest</h1>
                </div>


                {/* <div className="d-flex align-items-center gap-3">
                    <Bell size={20} />
                    <Menu size={20} />
                </div> */}
            </div>
        </header>
    )
}

export default Header