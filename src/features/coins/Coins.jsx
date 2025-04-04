import { useState, useEffect } from 'react';
import { useGetCoinsQuery } from './coinsApiSlice';
import { useGetCoinQuery } from "../coinSearch/coinSearchApiSlice";
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header/Header';
import CoinTable from './CoinTable';
import NavArrows from '../../components/NavArrows/NavArrows';
import SearchBox from '../../components/SearchBox/SearchBox';
import "./coins_css/Coins.css"
import Dots from '../../components/Dots/Dots';
import { useSwipeable } from 'react-swipeable';


const Coins = () => {

    // track the current page
    const [currentPage, setCurrentPage] = useState(1); 

    // handle touch motion or swipe action
    // const [touchStart, setTouchStart] = useState(0);
    // const [touchEnd, setTouchEnd] = useState(0);


    const [swipeDirection, setSwipeDirection] = useState(null)
    

    useEffect(() => {
        // Trigger fetch request when currentPage changes
        console.log("Current Page:", currentPage);
    }, [currentPage]); // Run this effect whenever currentPage changes


    useEffect(() => {
        if (swipeDirection) {
          const timer = setTimeout(() => {
            setSwipeDirection(null)
          }, 1000)
          return () => clearTimeout(timer)
        }
    }, [currentPage, swipeDirection])


    // handle touch start
    // const handleTouchStart = (e) => {
    //     setTouchStart(e.targetTouches[0].clientX)
    // }

    // handle Touch Move
    // const handleTouchMove = (e) => {
    //     setTouchEnd(e.targetTouches[0].clientX)
    // }


    // const handleTouchEnd = () => {
    //     if(touchStart - touchEnd > 100) {
    //         //swipe left
    //         if(currentPage < totalPages) {
    //             setCurrentPage(prev => prev + 1);
    //         }
    //     }

    //     if(touchStart - touchEnd < -100) {
    //         // swipe right
    //         if(currentPage > 1 ) {
    //             setCurrentPage(prev => prev - 1);
    //         }
    //     }
    // }

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


    const coinsPerPage = 10;
    const totalPages = coins ? Math.ceil(coins.length / coinsPerPage) : 10;

    
    
    // Configure swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setSwipeDirection("left")
            if (currentPage !== 1 && currentPage <= 10) {
                console.log("swipe left")
                setCurrentPage(prev => prev - 1)
            }
        },
        onSwipedRight: () => {
            setSwipeDirection("right")
            if (currentPage >= 1 ) {
                console.log("swipe right")
                setCurrentPage(prev => prev + 1)
            }
        },
        trackMouse: true, // Enable mouse tracking for testing on desktop
        preventScrollOnSwipe: true,
        trackTouch: true,
        delta: 10, // Min distance in px before a swipe is registered
        swipeDuration: 500, // Max time in ms to detect a swipe
        touchEventOptions: { passive: false },
        preventDefaultTouchmoveEvent: true
    })

  return ( 
    <>
        <Header />
        
        <div className="coin-page">

            <main className="container d-flex flex-column flex-grow-1">
              
                <>

                    <SearchBox handleSearch={handleSearch} handleSubmit={handleSubmit} search={search}/>

                
                    {!isError && !searchedForCoin && (
                        <NavArrows 
                            page={currentPage} 
                            handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} 
                        />
                    )}

                    {!isError && !searchedForCoin && (
                        <Dots 
                            totalPages={totalPages} 
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage} 
                        />  
                    )}


                    {isLoading && (
                        <div className="full-height">
                            <div className="mexican-wave text-center my-5 white-loading"></div>
                        </div>
                    )}
                    
                    
                    


                    {isError && (
                        <div className='full-height'>
                            <p data-testid="error" className="text-center text-danger">Oh no, there was an error</p>
                        </div>
                    )}

                    {searchedForCoin && coinSearchResult.length === 0 && (
                        <div className='text-center mt-4'>
                            <p className="font-weight text-danger">Oh no, coin not found</p>
                        </div>
                    )}


                    {isSuccess && (
                        <div 
                            className='table-responsive cointable_overflow' 
                            style={{ height: "100vh"}}
                            {...swipeHandlers}
                            // onTouchStart={handleTouchStart}
                            // onTouchEnd={handleTouchEnd}
                            // onTouchMove={handleTouchMove}
                        >
                            
                            
                            <table className="table table-hover">

                            {!searchedForCoin || (coinSearchResult && coinSearchResult.length > 0) ? (
                                <thead>
                                    <tr className="border-bottom">
                                        <th className="py-3 cursor-pointer">Name</th>
                                        <th className="py-3 cursor-pointer text-end">Price</th>
                                    </tr>
                                </thead>
                            ) : null}



                                <tbody className="bg-white">
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
                
                </>
            </main>
        </div>
    
    </>
  )
}

export default Coins