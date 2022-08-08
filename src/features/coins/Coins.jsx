import { useState } from 'react'
import { useGetCoinsQuery } from './coinsApiSlice'
import TableData from './TableData'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const Coins = () => {

    const [page, setPage] = useState(1);

    const queryRequest = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: "10",
        sparkline: "false",
        page
    }

    const {
        data: coins,
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetCoinsQuery(queryRequest)


    const handlePrevClick = async () => {
        try {
            setPage(prev => parseInt(prev - 1));
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleNextClick = async () => {
        try {
            setPage(prev => parseInt(prev + 1));
        } catch (e) {
            console.log(e.message);
        }
    }

  return ( 
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Coins</h3>
                    <p className="lead">Every crypto in the world on your screen</p>
                </div>
            </div>


            
            <div className="row">
                <div className="col-12 intro">
                    <div className="d-flex justify-content-between align-items-center">
                        <button disabled={page <= 1 ? true : false } onClick={handlePrevClick} className="btn btn-danger form-button"><FaArrowLeft /> Prev</button>

                        <p data-testid="pageNumber" className="font-weight">Page: {page}</p>

                        <button disabled={page >= 30 ? true : false } onClick={handleNextClick} className="btn btn-primary form-button">Next <FaArrowRight /></button>
                    </div>
                </div>
            </div>
            
            
            <div className="row d-flex justify-content-center">
                <div className="col-12">
                    {isLoading && <div className="mexican-wave text-center my-5"></div>}
                      
                    {isError && (<p data-testid="error" className="text-center text-danger">Oh no, there was an error {error.error} </p>)}

                    {isSuccess && (
                        <div className="table-responsive">
                            <table className="table tableDesign">
                                <thead>
                                    <tr>
                                        <th scope="col" className="ps-2 py-3 text-left text-uppercase">Name</th>
                                        <th scope="col" className="ps-2 py-3 text-left text-uppercase">Latest price</th>
                                        <th scope="col" className="ps-2 py-3 text-left text-uppercase">Latest change</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white" id="tbody">
                                    {coins.map((each, i) => (
                                        <TableData key={i} each={each} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )} 
                </div>                
            </div>
        </div>
    </section>
  )
}

export default Coins