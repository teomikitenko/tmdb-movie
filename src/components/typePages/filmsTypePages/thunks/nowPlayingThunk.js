import { createAsyncThunk } from "@reduxjs/toolkit";
import { takeMinusDate,nowDate } from "../../../../hooks/dateFunction/date";
/* const takeDateForward=()=>{
  const tenDays = 30*86400000 
 const days=new Date(new Date().getTime()-tenDays) 
 return `${new Date(days).getFullYear()}-${validMonth(
  new Date(days).getMonth() + 1
)}-${new Date(days).getDate()}`; 
}
const nowDate = () => {
  return `${new Date().getFullYear()}-${validMonth(
    new Date().getMonth() + 1
  )}-${new Date().getDate()}`;
};
const validMonth = (date) => {
  return date.toString().length > 1 ? date : 0 + date.toString();
};
 */

export const ChangeNowPlayingPage = createAsyncThunk(
  "changePageNowPlaying",
  async ({ page, genre, sort },thunkApi) => {
    console.log(thunkApi)
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=${page}&primary_release_date.gte=${takeMinusDate(10)}&primary_release_date.lte=${nowDate()}&sort_by=${sort}&with_genres=${genre}`,
      options
    );

    return await res.json();
  }
);
export const SortGenreNowPlaying = createAsyncThunk(
  "sortGenreNowPlaying",
  async ({genre, sort }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
      },
    };
    const res = await fetch(
      
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_date.gte=${takeMinusDate(10)}&primary_release_date.lte=${nowDate()}&sort_by=${sort}&with_genres=${genre}`,
      options
    );

    return await res.json();
  }
);
