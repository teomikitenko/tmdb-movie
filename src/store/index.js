import { configureStore } from '@reduxjs/toolkit'
import {reducer as filmReducer} from '../components/filmPage/filmSlice'
import { findBiId } from '../components/filmPage/filmSlice'
import { trendingPersons } from '../components/personsPage/personQuery'
import{reducer as searchReducer} from '../components/filmPage/searchSlice'
import { findByIdPerson } from '../components/person/personIdQuery'
import { findSerialsById } from '../components/serialsPage/serialsQuery'
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
      filmReducer,searchReducer,
      [multiFind.reducerPath]:multiFind.reducer,
      [trendingPersons.reducerPath]:trendingPersons.reducer,
      [findBiId.reducerPath]:findBiId.reducer,
      [findByIdPerson.reducerPath]:findByIdPerson.reducer,
      [findSerialsById.reducerPath]:findSerialsById.reducer},
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware,
      multiFind.middleware,
      findBiId.middleware,
      trendingPersons.middleware,
      findByIdPerson.middleware,
      findSerialsById.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

