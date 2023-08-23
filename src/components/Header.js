import { fetchFilms } from "./filmPage/filmSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import SearchPanel from "./filmPage/serchpanel/SearchPanel";
import FilmCards from "./FilmCards.js";



export const Header=()=>{
    const[period,setPeriod]=useState('day')

     const dispatch=useDispatch()
  

     useEffect(()=>{
        dispatch(fetchFilms(url,period))
     }
     ,[])

     const url=`https://api.themoviedb.org/3/trending/movie/day?language=uk-UA`
    return(
        <>
        <SearchPanel/>
        <div className="wrapper_conteiner">
         <button onClick={()=>setPeriod('day')} >За день</button>
         <button onClick={()=>setPeriod('week')} >За тиждень</button>
         <h2>У тренді</h2>
        <br /><br />
        <FilmCards/>
        </div>
        </>
    )
}


