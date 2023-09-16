import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  serialsArray: [],
  loadingStatus: "idle",
  filterType: "all",
  sortingType: "",
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
      state.sortingStatus = "pending";
      state.sortingType = "";
    },
    clearSerialsData: (state) => {
      state.serialsArray.splice(0, state.serialsArray.length);
      state.filterType = "all";
    },
    changeSerialsFilter: (state, action) => {
      state.filterType = action.payload;
    },
    changeSerialsSortingType: (state, action) => {
      state.sortingStatus = "success";
      state.sortingType = action.payload;
    },
  },
  extraReducers: {},
});
export const { reducer } = serialsTypeSlice;
