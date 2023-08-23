import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'

export const findSerialsById=createApi({
    reducerPath:'findSerials',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`);
            return headers;
          }
    }),
    endpoints:(builder)=>({
        getSerialById:builder.query({
            query:(id)=>`/tv/${id}?append_to_response=credits&language=uk-UA`
        })
    })
})
     export const {useGetSerialByIdQuery}=findSerialsById