import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { takeMinusDate, nowDate } from "../../../hooks/dateFunction/date";

export const popularQuery = createApi({
  reducerPath: "popularMedia",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/discover/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authToken.token;
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularFilmInCinema: builder.query({
      query: () =>
        `movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_year=2023&primary_release_date.gte=${takeMinusDate(
          27
        )}&primary_release_date.lte=${nowDate()}&sort_by=popularity.desc`,
    }),
    getStreamingSerials: builder.query({
      query: () =>
        "tv?include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=popularity.desc&watch_region=UA&with_watch_providers=8",
    }),
    getForRentFilms: builder.query({
      query: () =>
        `movie?include_adult=false&include_video=false&language=uk-UA&page=1&sort_by=vote_average.desc&vote_count.gte=1000&watch_region=UA&with_release_type=4&year=${new Date().getFullYear()}`,
    }),
  }),
});
export const {
  useGetPopularFilmInCinemaQuery,
  useGetStreamingSerialsQuery,
  useGetForRentFilmsQuery,
} = popularQuery;
