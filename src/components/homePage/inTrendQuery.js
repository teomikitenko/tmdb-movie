import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const inTrendsQuery=createApi({
    reducerPath:'inTrends',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.themoviedb.org/3/',
     prepareHeaders:(headers,{getState})=>{
        const token = getState().authToken.token;
        headers.set("authorization", `Bearer ${token}`)
        return headers;
    } 
    }),
    endpoints:(builder)=>({
        getTrendingMedia:builder.query({
            query:(period)=>`https://api.themoviedb.org/3/trending/all/${period}?language=uk-UA`
        }),
    }),
    
})
export const{useGetTrendingMediaQuery}=inTrendsQuery