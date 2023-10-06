import { createAsyncThunk } from "@reduxjs/toolkit";
import { takePlusDays,nowDate } from "../../../../hooks/dateFunction/date";
/* const validMonth = (date) => {
  return date.toString().length > 1 ? date : 0 + date.toString();
};
const takeDateSevenDays=()=>{
    const currentDate=new Date()
    const sevenDays=currentDate.setDate(currentDate.getDate() + 5);
   return `${new Date(sevenDays).getFullYear()}-${validMonth(
    new Date(sevenDays).getMonth() + 1
  )}-${validMonth(new Date(sevenDays).getDate())}`; 
  }
  const nowDate = () => {
    return `${new Date().getFullYear()}-${validMonth(
      new Date().getMonth() + 1
    )}-${new Date().getDate()}`;
  }; */
 


export const ChangeNowOnTVSerialsPage = createAsyncThunk(
    "serials/changeNowOnTVSerials",
    async ({ page, genre, sort }) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
        },
      };
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?air_date.gte=${nowDate()}&air_date.lte=${takePlusDays(7)}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=${page}&sort_by=${sort}&vote_count.gte=250&with_genres=${genre}`,
        options
      );
  
      return await res.json();
    }
  );
  
  export const SortGenreNowOnTVSerials = createAsyncThunk(
    "serials/sortNowOnTVSerials",
    async ({  genre, sort }) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
        },
      };
      const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?air_date.gte=${nowDate()}&air_date.lte=${takePlusDays(7)}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=${sort}&vote_count.gte=250&with_genres=${genre}`,
        options
      );
      return await res.json();
    }
  );
  
