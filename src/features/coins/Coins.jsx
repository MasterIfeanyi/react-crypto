import { useState } from 'react';
import { useGetCoinsQuery } from './coinsApiSlice';
import TableData from './TableData';
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetCoinQuery } from "../coinSearch/coinSearchApiSlice";
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import CoinTable from './CoinTable';

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


        <Header />


        <div className="container">
            

            <div className="row my-3">
                <form className="mx-auto" onSubmit={handleSubmit}>
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
            
            
            <div className="row">
                
                {isLoading && <div className="mexican-wave text-center my-5"></div>}
                    
                {isError && (<p data-testid="error" className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>)}
                    
                {/* {isError && (<p data-testid="error" className="text-center text-danger">{error.data.message}</p>)} */}

                {
                    isSuccess && (
                        <div className='table-responsive'>
                            <table className="table table-hover">
                                <thead>
                                    <tr className='border-bottom'>
                                        <th className="py-3 cursor-pointer">Name</th>
                                        <th className="py-3 cursor-pointer text-left">Price</th>
                                        <th className="py-3 cursor-pointer">
                                            Change
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {!searchedForCoin && coins.map((each, i) => (
                                        <tr key={i}>
                                            <td className="align-middle">
                                                <a href="/">
                                                    <img src={each.image} className="me-3 table-image" />    
                                                </a>
                                                <p className="symbol name-symbol mb-0 truncate">{ each.name }</p>
                                            </td>

                                            <td>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>















                            </table>
                        </div>
                    )
                }    

                      
                {isSuccess && (
                    <div 
                    
                        // className="table_responsive"
                        className="table-container"
                        style={{
                            height: "calc(100vh - 100px)", // Adjust height to fill the screen minus the header height
                            overflowY: "auto", // Enable vertical scrolling
                            overflowX: "auto", // Enable horizontal scrolling
                            // padding: "1rem",
                            boxSizing: "border-box",
                        }}
                    >
                        <table 
                            // className="table tableDesign"
                            className="table table-striped"
                            style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "fixed", // Ensures consistent column widths
                            }}>
                            


                            <tbody className="bg-white" id="tbody">
                                {!searchedForCoin && coins.map((each, i) => (
                                    <CoinTable key={i} each={each} />
                                ))}

                                {searchedForCoin && coinSearchResult.map((each, i) => (
                                    <CoinTable key={i} each={each} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )} 

                {searchedForCoin && coinSearchResult.length === 0 && (<p data-testid="coinError" className="text-center font-weight text-danger">Oh no, coin not found</p>)}
                              
            </div>
        </div>
    </section>
  )
}

export default Coins