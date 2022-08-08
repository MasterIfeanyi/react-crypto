import { apiSlice } from "../../app/api/apiSlice"


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: arg => ({
                url: `/coins/${arg}`
            }),
            providesTags: ["coin"],
        })
    })
})


export const {
    useGetUserQuery,
} = userApiSlice

