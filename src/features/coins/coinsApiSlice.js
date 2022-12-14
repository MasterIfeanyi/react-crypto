import { apiSlice } from "../../app/api/apiSlice"


export const cryptoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCoins: builder.query({
            query: (arg) => ({
                url: `/coins/markets`,
                params: {...arg}
            }),
            providesTags: ["coins"],
            // transformResponse: (response) => response.data
        })
    })
})


export const {
    useGetCoinsQuery,
} = cryptoApiSlice

