

[how to write unit tests with react testing library for a component that uses requests with RTK Query.](https://stackoverflow.com/questions/72492349/how-to-test-rtk-query-with-react-testing-library)

[Testing components with a request for rtk-query](https://stackoverflow.com/questions/73059793/testing-components-with-a-request-for-rtk-query)


[How to clear cache in rtk-query during testing](https://stackoverflow.com/questions/67999073/how-to-clear-rtk-query-cache-in-tests-between-requests-when-using-msw-and-jest)


## Option: skip in RTK query

I want to search through an array based on an input field provided in the app. 

I have a `useSearchMovieQuery` in RTK Query API which search for whatever a user enters in the search field. I want to prevent the query from running on the initial render, which can be achieved by skipping the query using `"skip"` or `"skipToken"`.

I want only to run this query after the user stops typing, not immediately after onChange event in the search field.

**solution**

We can delay fetching data in RTK query until some condition becomes true. If you want to prevent a query from automatically running, you can use the `skip` parameter in a hook.

To achieve this we use a custom hook `useDebounce` which will return the user input after 500ms 

```javascript

const [searchQuery, setSearchQuery] = useState("");
// custom hook
const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: searchResult,
    isSuccess: searchedForMovie,
    isFetching,
    isError,
  } = useSearchMovieQuery(debouncedSearchQuery, { skip: debouncedSearchQuery == "" });

```

Stackoverflow question: [rtk-query-run-query-only-after-user-stops-typing-in-search-field](https://stackoverflow.com/questions/72502994/rtk-query-run-query-only-after-user-stops-typing-in-search-field)

second question: [How to disable RTK Query auto-request fetching?](https://stackoverflow.com/questions/72382502/how-to-disable-rtk-query-auto-request-fetching)

You can learn more about `useDebounce` hook [here](https://dev.to/ohdylan/create-a-debounce-hook-for-search-box-auto-completion-11n1)

## Get table rows

**How to get all rows in a table body**

```javascript

const rows = document.querySelectorAll("table > tbody > tr");
//				OR
const Allrows = document.querySelectorAll("tr");

```

*source*: [blog](https://thewebdev.info/2021/06/26/how-to-get-the-row-count-of-an-html-table-with-javascript/)


## Query params RTK query

**How to query with multiple query parameters?**

If I want to make my URL to look like this `https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&order=market_cap_desc&per_page=100&page=1&sparkline=false`

baseURL: `https://api.coingecko.com/api/v3/coins/markets`

Query Parameters: `?vs_currency=ngn&order=market_cap_desc&per_page=100`


We can achieve this in RTK query, by creating an object that contains all the query paramters, and passing it as an option into the hook.

```javascript

const queryParams = {
  vs_currency: "usd",
  order: "market_cap_desc",
  page: "1",
  sparkline: "false",
  ids: debouncedSearchQuery,
  price_change_percentage: "1"
}


getCoins: builder.query({
  query: (arg) => ({
    url: `/coins/markets`,
    params: {...arg}
  }),
})

const { data: coinSearchResult, isSuccess: searchedForCoin } = useGetCoinQuery(queryParams)

```

Stackoverflow question: [RTK Query query parameter](https://stackoverflow.com/questions/70081202/rtk-query-query-parameter)

Second question: [Redux Toolkit RTK Query sending query parameters](https://stackoverflow.com/questions/68158110/redux-toolkit-rtk-query-sending-query-parameters)

## Path params RTK query

**How to query with multiple path parameters?**

If I want to make my URL look like this `https://api.coingecko.com/api/v3/coins/bitcoin`

baseURL: `https://api.coingecko.com/api/v3/coins`

Path Params: `/bitcoin/usd`


query accepts only one argument, you use an object that contains all your path parameters when using the automatically generated hooks.

```javascript
    getReport: builder.query({
      query: ({bitcoin, currency}) =>
        `/${bitcoin}/${currency}`,
    }),
        
    useGetReportQuery({
      bitcoin,
      currency
    });
```

GitHub issue: [How to query with multiple parameters](https://github.com/reduxjs/redux-toolkit/issues/1028)


## Testing 7: coin not found

**findBy..**

I am making an API request 500ms after a user stops typing. If the API response returns an empty array, I would like to show an error message of 

`oh no, coin not found`, but remember the API will only return a response 500ms after the user stops typing, we have to account for that delay when using `findByTestId`.

To do that we can pass in a third option for the `findBy*` query to wait longer. [read more about findBy](https://testing-library.com/docs/dom-testing-library/api-async/#findby-queries)

`findBy*` returns a promise, so we can use `async-await` to handle the promise it returns.

```javascript
await screen.findByTestId("coinError", {}, {timeout: 3000})
```

`findBy*` will wait until the error message is found. The query will check immediately and then after 50ms up until the 3000ms timeout is up.


[testing-async-stuff-in-react-components-with-jest-and-react-testing-library-mag](https://dev.to/lennythedev/testing-async-stuff-in-react-components-with-jest-and-react-testing-library-mag)

[redux-using-react-testing-library-s-findby-methods-to-test-asynchronous-behavior](https://egghead.io/lessons/redux-using-react-testing-library-s-findby-methods-to-test-asynchronous-behavior)

**waitFor**

As with the other Async functions, the `waitFor()` function returns a promise, so we have to preface Its call with the await keyword. It takes a callback function as an argument where we can make asynchronous function calls, perform Queries, and/or Run Assertions. The default timeout is 1000ms which will keep you under Jest's default timeout of 5000ms. [react-testing-librarys-waitfor-not-working](https://stackoverflow.com/questions/66661163/react-testing-librarys-waitfor-not-working)

You can also use `waitFor` to wait for 500ms until the API response is returned, by passing in an option.

***note, you can not use findBy inside waitFor, because it is already an Async function***

```javascript
await waitFor(() => {
    screen.getByTestId("coinError")
}, {timeout: 3000})
```

[react-testing-librarys-waitfor](https://www.anycodings.com/2021/12/react-testing-librarys-waitfor-not.html#findby-queries)

You can learn more about RTL(react testing libray) queries [here](https://testing-library.com/docs/dom-testing-library/cheatsheet/#queries)


## clear RTK query API state while testing

```jaavscript
afterEach(() => {
  store.dispatch(api.util.resetApiState())
})
```

stackoverflow: [Testing with Jest while using MSW and RTK Query leads to strange error in test](https://stackoverflow.com/questions/69302370/testing-with-jest-while-using-msw-and-rtk-query-leads-to-strange-error-in-test/69310703#69310703)