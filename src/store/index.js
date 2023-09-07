import { configureStore } from '@reduxjs/toolkit'
import {reducer as filmReducer} from '../components/filmPage/filmSlice'
import { trendingPersons } from '../components/personsPage/personQuery'
import{reducer as searchReducer} from '../components/filmPage/searchSlice'
import {  filmsTypeUpcomingSlice} from '../components/filmsTypePages/filmsTypeSlice'
import {reducer as typeFilmsCategory} from '../components/filmsTypePages/filmsTypeSlice'
import { multiFind } from '../components/filmPage/searchSlice'
   
const myMiddleware=(store)=>(next)=>(action)=>{
        if(typeof action === 'string'){
          return next({
              type:action
          })
        }
        return next(action)  
      }



export const store=configureStore({
    reducer:{
      filmReducer,searchReducer,typeFilmsCategory,
      [multiFind.reducerPath]:multiFind.reducer,
      [trendingPersons.reducerPath]:trendingPersons.reducer},
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware,
      multiFind.middleware,
      trendingPersons.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

