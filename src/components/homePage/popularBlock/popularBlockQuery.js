import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const validMonth = (date) => {
    return date.toString().length > 1 ? date : 0 + date.toString();
  };
  const takeDateMinusTwentySevenDays=()=>{
      const currentDate=new Date()
      const sevenDays=currentDate.setDate(currentDate.getDate() - 27 );
     return `${new Date(sevenDays).getFullYear()}-${validMonth(
      new Date(sevenDays).getMonth() + 1
    )}-${validMonth(new Date(sevenDays).getDate())}`; 
    }
    const nowDate = () => {
      return `${new Date().getFullYear()}-${validMonth(
        new Date().getMonth() + 1
      )}-${new Date().getDate()}`;
    };
   
export const popularQuery=createApi({
    reducerPath:'popularMedia',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.themoviedb.org/3/discover/',
     prepareHeaders:(headers,{getState})=>{
        const token = getState().authToken.token;
        headers.set("authorization", `Bearer ${token}`)
        return headers;
    } 
    }),
    endpoints:(builder)=>({
        getPopularFilmInCinema:builder.query({
            query:()=>`movie?include_adult=false&include_video=false&language=uk-UA&page=1&primary_release_year=2023&primary_release_date.gte=${takeDateMinusTwentySevenDays()}&primary_release_date.lte=${nowDate()}&sort_by=popularity.desc`
        }),
        getStreamingSerials:builder.query({
            query:()=>'tv?include_adult=false&include_null_first_air_dates=false&language=uk-UA&page=1&sort_by=popularity.desc&watch_region=UA&with_watch_providers=8'
        }),
        getForRentFilms:builder.query({
            query:()=>`movie?include_adult=false&include_video=false&language=uk-UA&page=1&sort_by=vote_average.desc&vote_count.gte=1000&watch_region=UA&with_release_type=4&year=${new Date().getFullYear()}`
        })
    }),
    
})
export const{useGetPopularFilmInCinemaQuery,useGetStreamingSerialsQuery,useGetForRentFilmsQuery}=popularQuery


