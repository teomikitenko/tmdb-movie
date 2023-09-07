import { createAsyncThunk } from '@reduxjs/toolkit'
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { fetchFilms } from '../filmPage/filmSlice'
const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'

 

export const  fetchTypeFilm=createAsyncThunk(
    'typeFilmSection',
    async(page)=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          }
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=${page}&primary_release_year=2023&primary_release_date.gte=2023-09-07&sort_by=popularity.desc`,options)
        return await res.json()
    }

)
const initialState={
    upcomingFilms:[],
    loadingStatus:'idle'
}

export const filmsTypeUpcomingSlice=createSlice({
    name:'typeFilms/Upcoming',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTypeFilm.pending,state=>{state.loadingStatus='loading'})
        .addCase(fetchTypeFilm.fulfilled,(state,action)=>{
            state.loadingStatus='success'
            state.upcomingFilms.push(...action.payload.results)
        })
        .addCase(fetchTypeFilm.rejected,state=>{state.loadingStatus='error'})

    }
    
})
export const {reducer}=filmsTypeUpcomingSlice
