import TypeFilm from "./Upcoming/TypeFilm"
import { theme } from "../.."
import { ThemeProvider } from "@mui/material"
import { useEffect, useState } from "react"
import { changeSortingType,clearData,clearSortingValue } from "./filmsTypeSlice"
import { useDispatch,useSelector } from "react-redux"
import { createSelector } from "reselect"

const sortSelector=createSelector(
  state => state.typeFilmsCategory.sortingType,
  state => state.typeFilmsCategory.sortingStatus,
  (sort,sortingStatus)=>({sort,sortingStatus})
  )


 const UpcomingFilms=({changePageThunk,filteSortThunk,title,endpoint})=>{
   const dispatch=useDispatch()
   const {sort,sortingStatus}=useSelector(sortSelector)
  console.log(sort)
    useEffect(()=>{
     dispatch(clearData())
     dispatch(changeSortingType(endpoint))
     return ()=> dispatch(clearSortingValue())
    },[]) 
   

    return(
      sort&& sortingStatus === 'success'&&<ThemeProvider theme={theme}>
        <TypeFilm
          changePageThunk={changePageThunk}
          filteSortThunk={filteSortThunk}
          type='Популярні'
          endpoint={endpoint}
          title={title}
          sort={sort}
        />
      </ThemeProvider> 
    )
}

export default UpcomingFilms 