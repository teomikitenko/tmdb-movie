import {createSlice} from "@reduxjs/toolkit";
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'




const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'



export const multiFind=createApi({
    reducerPath:'multiFind',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`);
            return headers;
          }
    }),
    endpoints:(builder)=>({
        getAllFind:builder.query({
            query:(res)=>`search/multi?query=${res}&language=uk-UA`
        })
    })
})
     export const {useGetAllFindQuery}=multiFind




const initSearch={
    searchResults:[],
    searchStatus:'idle',
    filterName:'movie',
  }
  
  const searchSlice=createSlice({
    name:'search',
    initialState:initSearch,
    reducers:{
      filter:(state,action)=>{state.filterName=action.payload},
    },
  
  })
     export const{filter}=searchSlice.actions
  export const{reducer} = searchSlice;