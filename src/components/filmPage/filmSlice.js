import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'


  const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
 export const findBiId=createApi({
    reducerPath:'findById',
    baseQuery:fetchBaseQuery({
         baseUrl:'https://api.themoviedb.org/3/',
        prepareHeaders:(headers)=>{
            headers.set('authorization', `Bearer ${token}`);
            return headers
        }
        }),
    endpoints:(builder)=>({
      getMovieById:builder.query({
        query:(id)=>`movie/${id}?append_to_response=credits&language=uk-UA`
      }),
  
   
    })
 })
 export const { useGetMovieByIdQuery} = findBiId





export const fetchFilms=createAsyncThunk(
    'PopularFilms/fetchFilms',
    async(url,period)=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          };
      const response=await fetch(url,options)
      return await response.json()
    }

)


const initialState={
    trendingFilms:[],
    loadingStatus:'idle',
}

const filmSlice=createSlice({
    name:'film',
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder
        .addCase(fetchFilms.pending,state=>{state.loadingStatus='loading'})
        .addCase(fetchFilms.fulfilled,(state,action)=>{
            state.trendingFilms.push(...action.payload.results)
            state.loadingStatus='idle'
        })
        .addCase(fetchFilms.rejected,state=>{state.loadingStatus='error'})
       

    }
})

export  const{reducer}=filmSlice
