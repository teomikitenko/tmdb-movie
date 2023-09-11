import { createAsyncThunk } from '@reduxjs/toolkit'
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import { fetchFilms } from '../filmPage/filmSlice'
const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'



const nowDate=()=>{
return `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}` 
 
}
console.log(nowDate())
 
export const  fetchTypeFilm=createAsyncThunk(
    'typeFilmSection',
    async({page,genre})=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          }
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=${page}&primary_release_year=${new Date().getFullYear()}&primary_release_date.gte=${nowDate()}&sort_by=popularity.desc&with_genres=${genre}`,options)
        return await res.json()
    }

)
export const  changeGenreFilm=createAsyncThunk(
    'changeGenre',
    async(genre)=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          }
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_year=${new Date().getFullYear()}&primary_release_date.gte=${nowDate()}&sort_by=popularity.desc&with_genres=${genre}`,options)
        return await res.json()
    }

)
const initialState={
    upcomingFilms:[],
    loadingStatus:'idle',
    filterType:'all',
    sortingType:'popular',
    pageCount:'0'
}

export const filmsTypeUpcomingSlice=createSlice({
    name:'typeFilms/Upcoming',
    initialState,
    reducers:{
       changeFilter:(state,action)=>{state.filterType=action.payload},
       changeSortingType:(state,action)=>{state.sortingType=action.payload}

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTypeFilm.pending,state=>{state.loadingStatus='loading'})
        .addCase(fetchTypeFilm.fulfilled,(state,action)=>{
            state.loadingStatus='success'
            state.upcomingFilms.push(...action.payload.results)
           state.pageCount=action.payload.page
        })
        .addCase(fetchTypeFilm.rejected,state=>{state.loadingStatus='error'})
        

       .addCase(changeGenreFilm.pending,state=>{state.loadingStatus='loading'})
       .addCase(changeGenreFilm.fulfilled,(state,action)=>{
           state.loadingStatus='success'
           state.upcomingFilms=action.payload.results
           state.pageCount=action.payload.page

       })
       .addCase(changeGenreFilm.rejected,state=>{state.loadingStatus='error'}) 

    },
    }
    
)
export const{changeFilter,changeSortingType}=filmsTypeUpcomingSlice.actions
export const {reducer}=filmsTypeUpcomingSlice
