import { apiSlice } from "../../app/api/apiSlice"


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: arg => ({
                url: `/coins/${arg}`
            }),
            providesTags: ["coins"],
        })
    })
})


export const {
    useGetUserQuery,
} = userApiSlice

