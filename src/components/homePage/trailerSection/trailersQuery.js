import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { takePlusDays,nowDate } from '../../../hooks/dateFunction/date';
export const getTrailers = createApi({
  reducerPath: "VideoTrailers",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/discover/",
     prepareHeaders: (headers, { getState }) => {
      const token = getState().authToken.token;
      headers.set("authorization", `Bearer ${token}`)
      return headers;
    }  }),
  endpoints: (builder) => ({
    getMoviesTrailers: builder.query({
      query: () =>
        `movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_year=${new Date().getFullYear()}&primary_release_date.gte=${nowDate()}&sort_by=popularity.desc`,
    }),
      getSerialsTrailers: builder.query({
      query: () =>
        `tv?air_date.gte=${nowDate()}&air_date.lte=${takePlusDays(7)}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=popularity.desc&vote_count.gte=250`,
    }),
    getSerialsOnTvTrailers: builder.query({
      query: () =>
        `tv?air_date.gte=${nowDate()}&air_date.lte=${nowDate()}&include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=popularity.desc&vote_count.gte=250`,
    }), 
  }),
});

export const findVideoTrailersMovie=createApi({
  reducerPath: "VideoTrailerMovie",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/movie/",
     prepareHeaders: (headers, { getState }) => {
      const token = getState().authToken.token;
      headers.set("authorization", `Bearer ${token}`)
      return headers;
    }  }),
    endpoints:(builder)=>({
      getFindMoviesTrailers:builder.query({
        query:(id)=>`${id}/videos?language=en-US`
      })
    })
})
export const findVideoTrailersSerials=createApi({
  reducerPath: "VideoTrailerSerials",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/tv/",
     prepareHeaders: (headers, { getState }) => {
      const token = getState().authToken.token;
      headers.set("authorization", `Bearer ${token}`)
      return headers;
    }  }),
    endpoints:(builder)=>({
      getFindSerialsTrailers:builder.query({
        query:(id)=>`${id}/videos?language=en-US`
      })
    })
})

export const{useGetFindSerialsTrailersQuery}=findVideoTrailersSerials
  export const{useGetFindMoviesTrailersQuery}=findVideoTrailersMovie
  export const { useGetMoviesTrailersQuery,useGetSerialsOnTvTrailersQuery,useGetSerialsTrailersQuery } = getTrailers;
