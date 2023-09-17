import { createSlice } from "@reduxjs/toolkit";
import { ChangePopularSerialsPage,SortGenrePopularSerials } from "./thunks/popularSerialsThunk";
import { ChangeRaitingFilmsPage } from "../filmsTypePages/thunks/raitingsFilmsThunk";
import { SortGenreTopRatedSerials } from "./thunks/topRatedSerialsThunk";
import { ChangeAiringTodaySerialsPage,SortGenreAiringTodaySerials } from "./thunks/airingTodaySerialsThunk";
import { ChangeNowOnTVSerialsPage, SortGenreNowOnTVSerials } from "./thunks/nowOnTvSerialsThunk";
const initialState = {
  serialsArray: [],
  loadingStatus: "idle",
  filterType: "all",
  sortingType: null,
  type:null,
  sortingStatus: "pending",
  genresArray: [
    {
      id: 37,
      name: "Вестерн",
    },
    {
      id: 9648,
      name: "Детектив",
    },

    {
      id: 10762,
      name: "Дитячий",
    },
    {
      id: 99,
      name: "Документальний",
    },
    {
      id: 18,
      name: "Драма",
    },
    {
      id: 10759,
      name: "Екшн і пригоди",
    },
    {
      id: 35,
      name: "Комедія",
    },
    {
      id: 80,
      name: "Кримінал",
    },
    {
      id: 10766,
      name: "Мильна опера",
    },
    {
      id: 16,
      name: "Мультфільм",
    },
    {
      id: 10765,
      name: "Науково фантастичний",
    },
    {
      id: 10763,
      name: "Новини",
    },
    {
      id: 10768,
      name: "Політика та війна",
    },
    {
      id: 10764,
      name: "Реаліті шоу",
    },
    {
      id: 10751,
      name: "Сімейний",
    },
    {
      id: 10767,
      name: "Ток-шоу",
    },
  ],
};

const serialsTypeSlice = createSlice({
  name: "serialsTypeSlice",
  initialState,
  reducers: {
    clearSerialsSortingValue: (state) => {
      state.sortingStatus='pending'
      state.sortingType = null;
    },
    resetSerialsData: (state,action) => {
      state.serialsArray.splice(0, state.serialsArray.length)
      state.type=action.payload
      state.sortingType = null
      state.filterType='all'
    },
    changeSerialsFilter: (state, action) => {
      state.filterType = action.payload;
    },
    changeSerialsSortingType: (state, action) => {
      state.sortingStatus='success'
      state.type=action.payload.type
      state.sortingType = action.payload.endpoint;
    },
  },
  extraReducers:(builder) =>{
    builder
    .addCase(ChangePopularSerialsPage.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(ChangePopularSerialsPage.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray.push(...action.payload.results);
    })
    .addCase(ChangePopularSerialsPage.rejected, (state) => {
      state.loadingStatus = "error";
    })

    .addCase(SortGenrePopularSerials.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(SortGenrePopularSerials.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray = action.payload.results;
    })
    .addCase(SortGenrePopularSerials.rejected, (state) => {
      state.loadingStatus = "error";
    })
    .addCase(ChangeRaitingFilmsPage.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(ChangeRaitingFilmsPage.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray.push(...action.payload.results);
    })
    .addCase(ChangeRaitingFilmsPage.rejected, (state) => {
      state.loadingStatus = "error";
    })

    .addCase(SortGenreTopRatedSerials.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(SortGenreTopRatedSerials.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray = action.payload.results;
    })
    .addCase(SortGenreTopRatedSerials.rejected, (state) => {
      state.loadingStatus = "error";
    })
    .addCase(ChangeAiringTodaySerialsPage.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(ChangeAiringTodaySerialsPage.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray.push(...action.payload.results);
    })
    .addCase(ChangeAiringTodaySerialsPage.rejected, (state) => {
      state.loadingStatus = "error";
    })

    .addCase(SortGenreAiringTodaySerials.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(SortGenreAiringTodaySerials.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray = action.payload.results;
    })
    .addCase(SortGenreAiringTodaySerials.rejected, (state) => {
      state.loadingStatus = "error";
    })
    .addCase(ChangeNowOnTVSerialsPage.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(ChangeNowOnTVSerialsPage.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray.push(...action.payload.results);
    })
    .addCase(ChangeNowOnTVSerialsPage.rejected, (state) => {
      state.loadingStatus = "error";
    })

    .addCase(SortGenreNowOnTVSerials.pending, (state) => {
      state.loadingStatus = "loading";
    })
    .addCase(SortGenreNowOnTVSerials.fulfilled, (state, action) => {
      state.loadingStatus = "success";
      state.serialsArray = action.payload.results;
    })
    .addCase(SortGenreNowOnTVSerials.rejected, (state) => {
      state.loadingStatus = "error";
    })

  },
});
export const {changeSerialsFilter,changeSerialsSortingType,clearSerialsSortingValue,resetSerialsData}=serialsTypeSlice.actions
export const { reducer } = serialsTypeSlice;
