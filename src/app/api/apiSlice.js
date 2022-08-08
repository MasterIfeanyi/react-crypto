import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    // baseUrl: "https://jsonplaceholder.typicode.com/"
    baseUrl: "https://api.coingecko.com/api/v3"
})


export const apiSlice = createApi({
    reducerPath: 'myApi',
    baseQuery,
    tagTypes: ["coins", "coin"],
    endpoints: builder => ({})
})