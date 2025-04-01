import React from 'react'
import Change from "./Change"

const CoinTable = ({each}) => {

    const returnPrice = (price) => {
        return `\u0024 ${Number(price).toLocaleString("en-US")}`;
    }


  return (
    <tr className=''>
        {/* logo and name */}
        <td className="py-3 align-middle text-start d-flex align-items-center">
            <a href="/">
                <img src={each.image} className="me-3 table-image" />    
            </a>
            <p className="symbol name-symbol mb-0 truncate">{ each.name }</p>
        </td>

        {/* current price */}
        <td className='pt-2 text-end'>
            <p className="symbol mb-0">{returnPrice(each["current_price"].toFixed(1))}</p>
            <Change change={each["price_change_percentage_24h"].toFixed(1)} />
        </td>

        {/* price change measure */}
        {/* <td className='py-3 align-middle text-start'>
            
        </td> */}
    </tr>
  )
}

export default CoinTable