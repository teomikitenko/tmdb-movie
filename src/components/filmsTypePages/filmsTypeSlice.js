import { createSlice } from "@reduxjs/toolkit";
import {
  SortGenreNowPlaying,
  ChangeNowPlayingPage,
} from "./thunks/nowPlayingThunk";
import {
  ChangeUpcomingFilmsPage,
  SortGenreUpcomingFilms,
} from "./thunks/upcomingFilmsThunk";
import {
  ChangeRaitingFilmsPage,
  SortGenreRaitingFilms,
} from "./thunks/raitingsFilmsThunk";
import {
  ChangePopularFilmPage,
  SortGenrePopularFilm,
} from "./thunks/popularFilmThunk";
const initialState = {
  filmsArray: [],
  loadingStatus: "idle",
  filterType: "all",
  sortingType: "",
  sortingStatus:'pending'
};

export const filmsTypeUpcomingSlice = createSlice({
  name: "typeFilms",
  initialState,
  reducers: {
    clearSortingValue: (state) => {
      state.sortingStatus='pending'
      state.sortingType = "";
    },
    clearData: (state) => {
      state.filmsArray.splice(0, state.filmsArray.length);
      state.filterType='all'
    },
    changeFilter: (state, action) => {
      state.filterType = action.payload;
    },
    changeSortingType: (state, action) => {
      state.sortingStatus='success'
      state.sortingType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChangeUpcomingFilmsPage.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(ChangeUpcomingFilmsPage.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray.push(...action.payload.results);
      })
      .addCase(ChangeUpcomingFilmsPage.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(SortGenreUpcomingFilms.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(SortGenreUpcomingFilms.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray = action.payload.results;
      })
      .addCase(SortGenreUpcomingFilms.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(ChangeNowPlayingPage.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(ChangeNowPlayingPage.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray.push(...action.payload.results);
      })
      .addCase(ChangeNowPlayingPage.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(SortGenreNowPlaying.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(SortGenreNowPlaying.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray = action.payload.results;
      })
      .addCase(SortGenreNowPlaying.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(ChangeRaitingFilmsPage.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(ChangeRaitingFilmsPage.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray.push(...action.payload.results);
      })
      .addCase(ChangeRaitingFilmsPage.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(SortGenreRaitingFilms.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(SortGenreRaitingFilms.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray = action.payload.results;
      })
      .addCase(SortGenreRaitingFilms.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(ChangePopularFilmPage.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(ChangePopularFilmPage.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray.push(...action.payload.results);
      })
      .addCase(ChangePopularFilmPage.rejected, (state) => {
        state.loadingStatus = "error";
      })

      .addCase(SortGenrePopularFilm.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(SortGenrePopularFilm.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.filmsArray = action.payload.results;
      })
      .addCase(SortGenrePopularFilm.rejected, (state) => {
        state.loadingStatus = "error";
      });
  },
});
export const { changeFilter, changeSortingType, clearData, clearSortingValue } =
  filmsTypeUpcomingSlice.actions;
export const { reducer } = filmsTypeUpcomingSlice;
