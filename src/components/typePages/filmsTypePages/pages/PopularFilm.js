import TypeMedia from "../../typeMediaSample/TypeMedia";
import { theme } from "../../../../index";
import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import {
  changeSortingType,
  resetData,
  clearSortingValue,
} from "../filmsTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const sortSelector=createSelector(
  state => state.typeFilmsCategory.sortingType,
  state => state.typeFilmsCategory.sortingStatus,
  (sort,sortingStatus)=>({sort,sortingStatus})
  )



const PopularFilm = ({ changePageThunk, filteSortThunk, title, endpoint,mediaType }) => {
  const {sort,sortingStatus} = useSelector(sortSelector);

   const dispatch = useDispatch();
 /*  useEffect(() => {
    dispatch(resetData());
    dispatch(changeSortingType(endpoint));
    return () =>{
      console.log('функція очищення')
      
    }
  }, []);  */

  return (
    /*  sort && sortingStatus=== 'success' && */(
      <ThemeProvider theme={theme}>
        <TypeMedia
         mediaType={mediaType}
          changePageThunk={changePageThunk}
          filteSortThunk={filteSortThunk}
          type="Популярні"
          endpoint={endpoint}
          title={title}
          sort={sort}
        />
      </ThemeProvider>
    )
  );
};
export default PopularFilm;
