import React from 'react'
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const Change = ({ change }) => {

    let content;

    if (change > 0) {
        content = (<p className="text-success price"><FaArrowUp /> {change} %</p>)
    } else {
        content = (<p className="text-danger price"><FaArrowDown /> {change} % </p>)
    }

    return content
}

export default Change