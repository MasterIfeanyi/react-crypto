import React from 'react'
// import { faSearch, faPhone, faUser, faFileAlt } from "@fortawesome/free-solid-svg-icons"
import { Search, Shield, Bell, Menu, AlertTriangle, FileText, Clock, MessageSquare, ChevronRight } from "lucide-react"
// import { Card, Badge, Button, Form } from "react-bootstrap"


const Header = () => {
    return (
        <header className="bg-dark text-white p-3 shadow" style={{
            position: "sticky",
            top: 0, 
            zIndex: 1000,
          }}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <img src="./logo.png" style={{width: "30px", height: "30px"}} alt="" />
                    <h1 className="h5 mb-0 fw-bold">One Trade</h1>
                </div>


                <div className="d-flex align-items-center gap-3">
                <Bell size={20} />
                <Menu size={20} />
                </div>
            </div>
        </header>
    )
}

export default Header