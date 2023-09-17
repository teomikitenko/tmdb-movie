import { createAsyncThunk } from "@reduxjs/toolkit";

 const takeDateOneDay=()=>{
    const currentDate=new Date()
    const sevenDays=currentDate.setDate(currentDate.getDate() + 1);
   return `${new Date(sevenDays).getFullYear()}-${validMonth(
    new Date(sevenDays).getMonth() + 1
  )}-${new Date(sevenDays).getDate()}`; 
  } 
  const nowDate = () => {
    return `${new Date().getFullYear()}-${validMonth(
      new Date().getMonth() + 1
    )}-${new Date().getDate()}`;
  };
  const validMonth = (date) => {
    return date.toString().length > 1 ? date : 0 + date.toString();
  };


export const ChangeAiringTodaySerialsPage = createAsyncThunk(
    "serials/changeAiringTodaySerials",
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
        `https://api.themoviedb.org/3/discover/tv?air_date.gte=${nowDate()}&air_date.lte=${nowDate()}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=${page}&sort_by=${sort}&vote_count.gte=250&with_genres=${genre}`,
        options
      );
  
      return await res.json();
    }
  );
  
  export const SortGenreAiringTodaySerials = createAsyncThunk(
    "serials/sortAiringTodaySerials",
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
          `https://api.themoviedb.org/3/discover/tv?air_date.gte=${nowDate()}&air_date.lte=${nowDate()}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=${sort}&vote_count.gte=250&with_genres=${genre}`,
        options
      );
      return await res.json();
    }
  );
  
