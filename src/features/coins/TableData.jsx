import React from 'react'
import Change from "./Change"

const TableData = ({ each }) => {

    const returnPrice = (price) => {
        return `\u0024 ${Number(price).toLocaleString("en-US")}`;
    }

    return (
        <tr className=''>

            {/* logo and name */}
            <td className="whitespace-nowrap align-middle" >
                
                <div className="d-flex align-items-center">
                    <a href="/">
                        <img src={each.image} className="me-3 table-image my-image" alt="" />    
                    </a>
                    <p className="symbol name-symbol mb-0" style={{ fontSize: "12px", verticalAlign: "middle" }}>{ each.name }</p>
                </div>
            </td>

            {/* current price */}
            <td className="whitespace-nowrap align-middle" style={{ fontSize: "0.8px" }}>
                <p className="symbol">{returnPrice(each["current_price"].toFixed(1))}</p>
            </td>

            {/* price change measure */}
            <td className="whitespace-nowrap align-middle" style={{ fontSize: "0.8px" }}>
                <Change change={each["price_change_percentage_24h"].toFixed(1)} />
            </td>
        </tr>
    )
}

export default TableData