import './App.css';
import { store } from './store';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux'
import {Header} from './components/Header'
import HeadPage from './components/headPage/HeadPage';
import { Routes,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import ContentPoster from './components/filmPage/contentPoster/contentPoster';
import SearchAllResults from './components/resultsPage/searchAllResult'
import Persons from './components/personsPage/persons';
import Person from './components/person/Person';
import Serials from './components/serialsPage/serials';


/* function App() {

  return (
    <Routes>
      <Route path='/' element={<HeadPage/>}>
      <Route  index element={<Header/>}/>
      
      <Route path='films/:idFilm' element={<ContentPoster/>}/>
     
       <Route path='results/:res' element={<SearchAllResults/>}></Route>
       <Route path='persons' element={<Persons/>} ></Route>
       <Route path='persons/:idPerson' element={<Person/>} ></Route>
       <Route path='tv/:idSerial' element={<Serials/>} ></Route>
      </Route>
    </Routes>
  )
}

export default App; */
