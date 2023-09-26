import { configureStore, createReducer, createSlice } from "@reduxjs/toolkit";
import { reducer as filmReducer } from "../components/filmPage/filmSlice";
import { trendingPersons } from "../components/personsPage/personQuery";
import { reducer as searchReducer } from "../components/filmPage/searchSlice";
import { reducer as typeFilmsCategory } from "../components/typePages/filmsTypePages/filmsTypeSlice";
import { reducer as typeSerialsCategory } from "../components/typePages/serialsTypePages/serialsTypeSlice";
import { multiFind } from "../components/filmPage/searchSlice";
import { getTrailers } from "../components/homePage/trailerSection/trailersQuery";
import {
  findVideoTrailersSerials,
  findVideoTrailersMovie,
} from "../components/homePage/trailerSection/trailersQuery";

console.log(getTrailers);
const myMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const initialState = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
};
const myToken = createSlice({
  name: "token",
  initialState,
});
let { reducer: authToken } = myToken;

export const store = configureStore({
  reducer: {
    authToken,
    filmReducer,
    searchReducer,
    typeFilmsCategory,
    typeSerialsCategory,
    [findVideoTrailersMovie.reducerPath]: findVideoTrailersMovie.reducer,
    [findVideoTrailersSerials.reducerPath]: findVideoTrailersSerials.reducer,
    [getTrailers.reducerPath]: getTrailers.reducer,
    [multiFind.reducerPath]: multiFind.reducer,
    [trendingPersons.reducerPath]: trendingPersons.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      myMiddleware,
      findVideoTrailersMovie.middleware,
      findVideoTrailersSerials.middleware,
      getTrailers.middleware,
      multiFind.middleware,
      trendingPersons.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
