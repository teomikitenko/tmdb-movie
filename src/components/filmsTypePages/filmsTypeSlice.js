import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'



const nowDate=()=>{
return `${new Date().getFullYear()}-${validMonth(new Date().getMonth() + 1)}-${new Date().getDate()}` 
 
}
const validMonth=(date)=>{
    return date.toString().length>1? date: 0 + date.toString()
} 
export const  ChangePage=createAsyncThunk(
    'typeFilmSection',
    async({page,genre,sort})=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          }
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=${page}&primary_release_year=${new Date().getFullYear()}&primary_release_date.gte=${nowDate()}&sort_by=${sort}&with_genres=${genre}`,options)
        return await res.json()
    }

)
export const  changeSortGenreFilm=createAsyncThunk(
    'changeSortGenre',
    async({genre,sort})=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
            }
          }
        const res=await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_year=${new Date().getFullYear()}&primary_release_date.gte=${nowDate()}&sort_by=${sort}&with_genres=${genre}`,options)
        return await res.json()
    }

)
const initialState={
    filmsArray:[],
    loadingStatus:'idle',
    filterType:28,
    sortingType:'popularity.desc',
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
        .addCase(ChangePage.pending,state=>{state.loadingStatus='loading'})
        .addCase(ChangePage.fulfilled,(state,action)=>{
            state.loadingStatus='success'
            state.filmsArray.push(...action.payload.results)
        })
        .addCase(ChangePage.rejected,state=>{state.loadingStatus='error'})
        

       .addCase(changeSortGenreFilm.pending,state=>{state.loadingStatus='loading'})
       .addCase(changeSortGenreFilm.fulfilled,(state,action)=>{
           state.loadingStatus='success'
           state.filmsArray=action.payload.results

       })
       .addCase(changeSortGenreFilm.rejected,state=>{state.loadingStatus='error'}) 

        
       /* .addCase(sortingFilm.pending,state=>{state.loadingStatus='loading'})
       .addCase(sortingFilm.fulfilled,(state,action)=>{
           state.loadingStatus='success'
           state.filmsArray=action.payload.results

       })
       .addCase(sortingFilm.rejected,state=>{state.loadingStatus='error'}) 
 */

    },
    }
    
)
export const{changeFilter,changeSortingType}=filmsTypeUpcomingSlice.actions
export const {reducer}=filmsTypeUpcomingSlice
