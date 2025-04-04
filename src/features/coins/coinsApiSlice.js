import { apiSlice } from "../../app/api/apiSlice"


export const cryptoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCoins: builder.query({
            query: (arg) => ({
                url: `/coins/markets`,
                params: {...arg}
            }),
            // Provide tags to use for invalidation
            providesTags: (result, error, arg) => [{ type: 'coins', id: arg.page }],
            keepUnusedDataFor: 3600,

            // Optional: avoid refetching on remount if within 1 hour
            refetchOnMountOrArgChange: false
        })
    })
})


export const {
    useGetCoinsQuery,
} = cryptoApiSlice

