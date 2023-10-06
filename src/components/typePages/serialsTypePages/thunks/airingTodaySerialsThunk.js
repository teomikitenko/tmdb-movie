import { createAsyncThunk } from "@reduxjs/toolkit";
import { nowDate } from "../../../../hooks/dateFunction/date";

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
  
