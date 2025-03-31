import { useState } from 'react';
import { useGetCoinsQuery } from './coinsApiSlice';
import TableData from './TableData';
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetCoinQuery } from "../coinSearch/coinSearchApiSlice";
import useDebounce from '../../hooks/useDebounce';


const Coins = () => {

    // track the current page
    const [page, setPage] = useState(1);

    // track user search request
    const [search, setSearch] = useState("");

    // make API call 500ms after user stops typing
    const debouncedSearchQuery = useDebounce(search, 500);

    const queryRequest = {
        vs_currency: "usd", // display price in USD
        order: "market_cap_desc", // coins by marketcap in descending order
        per_page: "10", // number of coins per page
        sparkline: "false",
        page
    }

    const coinQueryRequest = {
        vs_currency: "usd", // display price in USD 
        order: "market_cap_desc", // coins by marketcap in descending order
        page: "1", // limit the page to 1
        sparkline: "false",
        ids: debouncedSearchQuery.toLowerCase(), // get a coin by the ID
        price_change_percentage: "1" 
    }

    const {
        data: coins, // all the coins that was fetched or recieved
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetCoinsQuery(queryRequest)


    const { data: coinSearchResult, isSuccess: searchedForCoin } = useGetCoinQuery(coinQueryRequest, { skip: debouncedSearchQuery === "" })


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

    const handleSubmit = (e) => e.preventDefault();

    const handleSearch = (e) => {
        let lowerCase = e.target.value;
        setSearch(lowerCase)
    }

    // <div className="row">
    //     <div className="col-12 intro text-center">
    //         <h3 className="mt-4">Coins</h3>
    //         <p className="lead">Every crypto in the world on your screen</p>
    //     </div>
    // </div>

  return ( 
    <section className="section">
        <div className="container">
            

            <div className="row">
                <form className="col-lg-6 mx-auto" onSubmit={handleSubmit}>
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

            
            <div className="row">
                <div className="col-12 intro">
                    <div className="d-flex justify-content-between align-items-center">
                        <button 
                            disabled={page <= 1 ? true : false } 
                            onClick={handlePrevClick} 
                            className="btn btn-danger form-button"
                            >
                            <FaArrowLeft /> Prev
                        </button>

                        <p data-testid="pageNumber" className="font-weight">Page: {page}</p>

                        <button disabled={page >= 30 ? true : false } onClick={handleNextClick} className="btn btn-primary form-button">Next <FaArrowRight /></button>
                    </div>
                </div>
            </div>
            
            
            <div className="row d-flex justify-content-center">
                <div className="col-12">
                    {isLoading && <div className="mexican-wave text-center my-5"></div>}
                      
                    {isError && (<p data-testid="error" className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>)}
                      
                    {/* {isError && (<p data-testid="error" className="text-center text-danger">{error.data.message}</p>)} */}

                    

                      
                    { isSuccess && (
                        <div className="table-responsive">
                            <table className="table tableDesign">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-2 text-left text-uppercase">Name</th>
                                        <th scope="col" className="py-2 text-left text-uppercase">Latest price</th>
                                        <th scope="col" className="py-2 text-left text-uppercase">Latest change</th>
                                    </tr>
                                </thead>


                                <tbody className="bg-white" id="tbody">
                                    {!searchedForCoin && coins.map((each, i) => (
                                        <TableData key={i} each={each} />
                                    ))}

                                    {searchedForCoin && coinSearchResult.map((each, i) => (
                                        <TableData key={i} each={each} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )} 

                    {searchedForCoin && coinSearchResult.length === 0 && (<p data-testid="coinError" className="text-center font-weight text-danger">Oh no, coin not found</p>)}
                </div>                
            </div>
        </div>
    </section>
  )
}

export default Coins