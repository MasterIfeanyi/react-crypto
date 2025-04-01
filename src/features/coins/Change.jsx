import React from 'react'
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const Change = ({ change }) => {

    let content;

    if (change > 0) {
        content = (<p style={{fontSize: "10px"}} className="text-success price mb-0"><FaArrowUp /> {change} %</p>)
    } else {
        content = (<p style={{fontSize: "10px"}} className="text-danger price mb-0"><FaArrowDown /> {change} % </p>)
    }

    return content
}

export default Change