import { useState } from 'react';
import { useGetCoinsQuery } from './coinsApiSlice';
import { useGetCoinQuery } from "../coinSearch/coinSearchApiSlice";
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header/Header';
import CoinTable from './CoinTable';
import NavArrows from '../../components/NavArrows/NavArrows';
import SearchBox from '../../components/SearchBox/SearchBox';
import "./coins_css/Coins.css"


const Coins = () => {

    // track the current page
    const [currentPage, setCurrentPage] = useState(1); 

    // const [page, setPage] = useState(1); // track the page number


    // track user search request
    const [search, setSearch] = useState("");

    // make API call 500ms after user stops typing
    const debouncedSearchQuery = useDebounce(search, 500);

    // API query parameters
    const queryRequest = {
        vs_currency: "usd", // display price in USD
        order: "market_cap_desc", // coins by marketcap in descending order
        per_page: "10", // number of coins per page
        sparkline: "false",
        page: currentPage // Current Page
    }

    // search for a particular coin
    const coinQueryRequest = {
        vs_currency: "usd", // display price in USD 
        order: "market_cap_desc", // coins by marketcap in descending order
        page: "1", // limit the page to 1
        sparkline: "false",
        ids: debouncedSearchQuery.toLowerCase(), // get a coin by the ID
        price_change_percentage: "1" 
    }

    const {
        data: coins, // all the coins that was fetched
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetCoinsQuery(queryRequest)


    const { data: coinSearchResult, isSuccess: searchedForCoin } = useGetCoinQuery(coinQueryRequest, { skip: debouncedSearchQuery === "" })


    const handlePrevClick = async () => {
        setCurrentPage(prev => parseInt(prev - 1));
    }

    const handleNextClick = async () => {
        setCurrentPage(prev => parseInt(prev + 1));
    }

    const handleSubmit = (e) => e.preventDefault();

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    // Handle dot click to navigate pages
    // const handleDotClick = (pageNumber) => {
    //     setCurrentPage(pageNumber); // Update the current page
    // };

  return ( 
    <>
        <Header />
        
        <div className="coin-page">

            <main className="container d-flex flex-column flex-grow-1">
              
                <div className="">

                    <SearchBox handleSearch={handleSearch} handleSubmit={handleSubmit} search={search}/>

                
                    <NavArrows page={currentPage} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />

                    <div className="page-indicator">
                    {Array.from({ length: 2 }).map((_, index) => {

                        // Calculate the page number based on the index and currentPage
                        // Calculate the page number for each dot
                        // const pageNumber = Math.max(1, Math.min(10, currentPage - 1 + index));


                        // Calculate the page number for each dot
                        const pageNumber = currentPage + index;


                        // Ensure the page number doesn't exceed the maximum (10)
                        if (pageNumber > 10) return null;


                        return (
                            <div
                                key={index}
                                className={`page-dot ${pageNumber === currentPage ? "active" : ""}`}                               
                            />
                        )
                    })}
                    </div>
                
                
                
                    



                    {isLoading && <div className="mexican-wave text-center my-5 white-loading"></div>}
                    
                    
                    {searchedForCoin && coinSearchResult.length === 0 && (
                        <div>
                            <p data-testid="coinError" className="text-center font-weight text-danger">Oh no, coin not found</p>
                        </div>
                    )}


                    {isError && (
                        <div className='d-flex flex-grow-1 justify-content-center align-items-center' style={{ height: "100%" }}>
                            <p data-testid="error" className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>
                        </div>
                    )}


                    {isSuccess && (
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
                    )}                                    
                
                </div>
            </main>
        </div>
    
    </>
  )
}

export default Coins