import React from 'react'
import Change from "./Change"

const TableData = ({ each }) => {

    const returnPrice = (price) => {
        return `\u20A6 ${Number(price).toLocaleString("en-US")}`;
    }

    return (
        <tr>
            <td className="px-2 py-4 whitespace-nowrap">
                <div className="d-flex justify-content-left align-items-center text-center">
                    <a href="/">
                        <img src={each.image} className="me-3 table-image my-image" alt="" />    
                    </a>
                    <p className="symbol name-symbol">{ each.name } ({ each.symbol.toUpperCase() }) </p>
                </div>
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
                <p className="symbol">{returnPrice(each["current_price"].toFixed(1))}</p>
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
                <Change change={each["price_change_percentage_24h"].toFixed(1)} />
            </td>
        </tr>
    )
}

export default TableData