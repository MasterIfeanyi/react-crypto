import { apiSlice } from "../../app/api/apiSlice"


// export const coinSearchApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         getCoins: builder.query({
//             query: (arg) => ({
//                 url: `/coins/markets`,
//                 params: {...arg}
//             }),
//             providesTags: ["coins"],
//         })
//     })
// })


export const coinSearchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCoin: builder.query({
            query: arg => ({
                url: `/coins/markets`,
                params: {...arg}
            }),
            providesTags: ["coin"],
        })
    })
})


export const {
    useGetCoinQuery,
} = coinSearchApiSlice

