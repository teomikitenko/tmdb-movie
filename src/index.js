import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import {store} from './store'
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Header} from './components/Header'
import HeadPage from './components/headPage/HeadPage';
import { Routes,Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import ContentPoster from './components/filmPage/contentPoster/contentPoster';
import SearchAllResults from './components/resultsPage/searchAllResult'
import Persons from './components/personsPage/persons';
import Person from './components/person/Person';
import Serials from './components/serialsPage/serials';
import EnterInPage from './components/authorizationPage/authorization';
import UpcomingFilms from './components/filmsTypePages/Upcoming/Upcoming';
import { loadUpcomingMovies } from './components/filmsTypePages/Upcoming/Upcoming';
import { createTheme,ThemeProvider} from '@mui/material/styles';
const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};
const theme=createTheme({
  components:{
    MuiSvgIcon:{
      styleOverrides:{
        root:{
          fontSize:'20px',
          fill:'#000'
        }

      }
    }
  },
  typography:{
    fontFamily:'Source Sans 3',
    fontSize:'1em'
    
  }
})
const router=createBrowserRouter(
    createRoutesFromElements( 
      <Route  path='/' element={<HeadPage/>}> 
       <Route  index element={<Header/>}/>
      <Route path='films/:idFilm'
       loader={async({params})=>{
        return fetch(`https://api.themoviedb.org/3/movie/${params.idFilm}?append_to_response=credits%2Cvideos,%2Cimages%2Cexternal_ids&language=uk%2Cen`,options)
       }} 
      element={<ContentPoster/>}/>
      
      <Route path='/upcomingFilms' element={
      <ThemeProvider theme={theme}>
      <UpcomingFilms/>
      </ThemeProvider>

      }
       />
      
      <Route path='results/:res' element={<SearchAllResults/>}/>
      <Route path='persons' element={<Persons/>} />
      <Route path='persons/:idPerson'
       loader={async({params})=>{
        return fetch(`https://api.themoviedb.org/3/person/${params.idPerson}?append_to_response=movie_credits%2Ctv_credits%2Cexternal_ids`,options)
       }} 
      element={<Person/>}/>
      <Route path='tv/:idSerial'
       loader={async({params})=>{
        return fetch(`https://api.themoviedb.org/3/tv/${params.idSerial}?append_to_response=credits%2Cimages%2Cvideos%2Cexternal_ids&language=en`,options)
       }} 
      element={<Serials/>} /> 
      <Route path='/auth' element={<EnterInPage/>}/>
      </Route>
    )
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <RouterProvider
    router={router}
    />
    </Provider>
 
);

