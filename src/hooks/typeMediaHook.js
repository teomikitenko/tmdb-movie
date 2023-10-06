import { useRef, useState, useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {
  changeSortingType,
  clearSortingValue,
  resetData,
} from "../components/typePages/filmsTypePages/filmsTypeSlice";
import {
  changeSerialsSortingType,
  clearSerialsSortingValue,
  resetSerialsData,
} from "../components/typePages/serialsTypePages/serialsTypeSlice";

const useTypeMedia = (  changePageThunk,
    filteSortThunk,
    title,
    type,
    mediaType,
    endpoint,genre,sort,data) => {
  const inputEl = useRef(null);
  const [hideButton, setHideButton] = useState(false);
  const [page, setPage] = useState(1);
  const [flagSort, setFlagSort] = useState(false);
  const base_poster = "https://image.tmdb.org/t/p/w500";

  const dispatch = useDispatch();
  const classNames = require("classnames");
  const divClass = classNames({
    download_more: true,
    hide_button: hideButton,
  });
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const options = {
      rootMargin: "0% 0% 60% 0%",
      threshold: 0.1,
    };
    const callback = function (entries, observer) {
      console.log(entries);

      if (entries[0].isIntersecting && hideButton) setPage(page + 1);
    };
    const observer = new IntersectionObserver(callback, options);
    if (inputEl.current) observer.observe(inputEl.current);
    return () => {
      if (inputEl.current) observer.disconnect(inputEl.current);
    };
  }, [data]);

  useEffect(() => {
    if (page >= 2) dispatch(changePageThunk({ page, genre, sort }));
  }, [page]);

  useEffect(() => {
    dispatch(mediaType === "movies" ? resetData(type) : resetSerialsData(type));
    setFlagSort(true);
    dispatch(
      mediaType === "movies"
        ? changeSortingType({ endpoint, type })
        : changeSerialsSortingType({ endpoint, type })
    );
    return () => {
      dispatch(
        (mediaType = "movies"
          ? clearSortingValue()
          : clearSerialsSortingValue())
      );
    };
  }, []);

  useEffect(() => {
    if (flagSort) dispatch(filteSortThunk({ genre, sort }));
  }, [genre, sort, flagSort]);

  const checkPath = (id) => {
    return mediaType === "movies" ? `/films/${id}` : `/tv/${id}`;
  };
  return {divClass,checkPath,base_poster,hideButton,setHideButton,page,setPage,flagSort,setFlagSort,inputEl}
};
export default useTypeMedia;
