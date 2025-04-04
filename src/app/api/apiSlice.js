import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQueryWithoutRetry = fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
})



// Step 2: Create the custom retry handler
const customRetryHandler = async (args, api, extraOptions) => {
    const MAX_RETRIES = 3;
    let result = await baseQueryWithoutRetry(args, api, extraOptions);
    let retryCount = 0;
  
    while (retryCount < MAX_RETRIES && (result.error || result.status === 429)) {
      retryCount++;
      
      if (result.status === 429) {
        console.log(`Rate limited. Retrying after 5 seconds... Attempt ${retryCount}`);
      } else {
        console.log(`Request failed. Retrying after 5 seconds... Attempt ${retryCount}`);
      }
      
      // Wait for 5 seconds - 5,000 milliseconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // Retry the request
      result = await baseQueryWithoutRetry(args, api, extraOptions);
    }
  
    return result;
};


export const apiSlice = createApi({
    reducerPath: 'myApi',
    baseQuery: customRetryHandler,
    tagTypes: ["coins", "coin"],
    endpoints: builder => ({})
})