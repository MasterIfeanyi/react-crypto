import { useState } from 'react';
import { useGetCoinsQuery } from './coinsApiSlice';
import TableData from './TableData';
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetCoinQuery } from "../coinSearch/coinSearchApiSlice";
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header/Header';
import CoinTable from './CoinTable';
import Change from './Change';
import NavArrows from '../../components/NavArrows/NavArrows';
import SearchBox from '../../components/SearchBox/SearchBox';

const Coins = () => {

    const returnPrice = (price) => {
        return `\u0024 ${Number(price).toLocaleString("en-US")}`;
    }

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
    <>
        <Header />
        
        <div className="coin-page">


            <main className="container">
                
                {/* <div className="sticky top-0 z-3">
                </div> */}
                

                <SearchBox handleSearch={handleSearch} handleSubmit={handleSubmit} search={search}/>

                
                <NavArrows page={page} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />
                
                
                
                <div className="row">
                    
                    {isLoading && <div className="mexican-wave text-center my-5 white-loading"></div>}
                        
                    {isError && (<p data-testid="error" className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>)}
                        
                    {/* {isError && (<p data-testid="error" className="text-center text-danger">{error.data.message}</p>)} */}

                    {
                        isSuccess && (
                            <div className='table-responsive cointable_overflow' style={{ height: "100vh"}}>
                                <table className="table table-hover">
                                    <thead>
                                        <tr className='border-bottom'>
                                            <th className="py-3 cursor-pointer">Name</th>
                                            <th className="py-3 cursor-pointer text-end">Price</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {!searchedForCoin && coins.map((each, i) => (
                                        <CoinTable key={i} each={each}/> 
                                        ))}

                                        {searchedForCoin && coinSearchResult.map((each, i) => (
                                            <CoinTable key={i} each={each} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }    

                        
                    {/* {isSuccess && (
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
                    )}  */}

                    {searchedForCoin && coinSearchResult.length === 0 && (<p data-testid="coinError" className="text-center font-weight text-danger">Oh no, coin not found</p>)}
                                
                </div>
            </main>
        </div>
    
    </>
  )
}

export default Coins