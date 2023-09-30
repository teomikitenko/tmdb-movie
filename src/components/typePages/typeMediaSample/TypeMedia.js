import "./typeMedia.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { LinearProgress} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FilterColumn } from "./filterColumn/filtersColumn";
import {
  changeSortingType,
  clearSortingValue,
  resetData,
} from "../filmsTypePages/filmsTypeSlice";
import { changeSerialsSortingType,clearSerialsSortingValue,resetSerialsData } from "../serialsTypePages/serialsTypeSlice";

const selectValuesMovies = createSelector(
  (state) => state.typeFilmsCategory.filmsArray,
  (state) => state.typeFilmsCategory.loadingStatus,
  (state) => state.typeFilmsCategory.filterType,
  (state) => state.typeFilmsCategory.sortingType,
  (data, flag, genre, sort) => ({
    data, flag, genre, sort
  })
);
const selectValuesSerials=createSelector(
  (state) => state.typeSerialsCategory.serialsArray,
  (state) => state.typeSerialsCategory.loadingStatus,
  (state) => state.typeSerialsCategory.filterType,
  (state) => state.typeSerialsCategory.sortingType,
  (data, flag, genre, sort) => ({
    data,
    flag,
    genre,
    sort,
  })
);

const TypeMedia = ({
  changePageThunk,
  filteSortThunk,
  title,
  type,
  mediaType,
  endpoint,
}) => {
  const dispatch = useDispatch();
  const [hideButton, setHideButton] = useState(false);
  const [page, setPage] = useState(1);
  const [flagSort, setFlagSort] = useState(false);
  const base_poster = "https://image.tmdb.org/t/p/w500";

  const { data, flag, genre, sort } = useSelector(mediaType === 'movies'?  selectValuesMovies:selectValuesSerials );
  console.log(data)
  const classNames = require("classnames");
  const divClass = classNames({
    download_more: true,
  });
  useEffect(() => window.scrollTo(0, 0), []);


  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, [data]);

  const scrollListener = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    if (
      hideButton &&
      document.documentElement.clientHeight + window.pageYOffset >=
        scrollHeight - 400
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page >= 2) dispatch(changePageThunk({ page, genre, sort }));
  }, [page]);

  useEffect(() => {
    dispatch(mediaType==='movies'?resetData(type):resetSerialsData(type));
    setFlagSort(true);
    dispatch(mediaType==="movies"?changeSortingType({endpoint,type}):changeSerialsSortingType({endpoint,type}));
    return () => {
      dispatch(mediaType='movies'?clearSortingValue():clearSerialsSortingValue());
    };
  }, []);

  useEffect(() => {
    if (flagSort) dispatch(filteSortThunk({ genre, sort }));
  }, [genre, sort, flagSort]);

const checkPath=(id)=>{
 return mediaType === 'movies'? `/films/${id}`:`/tv/${id}`
}

  return (
    sort && (
      <div className="wrapper_conteiner">
        <div className="content_column_wrapper">
          <div className="title_type_media">
            <p>{title}</p>
          </div>
          <div className="content_media">
            <FilterColumn type={type} mediaType={mediaType} />
            <div className="cards_column">
              <section className="media_results">
                <TransitionGroup component={null}>
                  {data.map(media=> {
                    return (
                      <CSSTransition
                        key={media.id}
                        timeout={500}
                        classNames="my-node"
                      >
                        <Link to={checkPath(media.id)}>
                        <div className="card_media">
                          <div className="card_image_wrapper">
                            <img src={base_poster + media.poster_path} alt="" />
                          </div>
                          <div className="card_text_wrapper">
                            <div className="text_title_card">
                              <p className="title_text">{media.title}</p>
                              <p className="date_text">{media.release_date}</p>
                            </div>
                          </div>
                        </div>
                        </Link>
                      
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
                {flag === "loading" && <Loader />}
                {page <= 1 && flag === "success" && data.length === 20 && (
                  <div
                    onClick={() => {
                      setPage(page + 1);
                      setHideButton(true);
                    }}
                    className={divClass}
                  >
                    <p>Завантажити більше</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export const Loader = () => {
  return (
    <LinearProgress
      sx={{ width: "100%", position: "fixed", top: "0", left: "0" }}
    />
  );
};

export default TypeMedia;
