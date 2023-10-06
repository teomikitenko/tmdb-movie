import "./typeMedia.css";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { LinearProgress } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FilterColumn } from "./filterColumn/filtersColumn";

import useTypeMedia from "../../../hooks/typeMediaHook";
const selectValuesMovies = createSelector(
  (state) => state.typeFilmsCategory.filmsArray,
  (state) => state.typeFilmsCategory.loadingStatus,
  (state) => state.typeFilmsCategory.filterType,
  (state) => state.typeFilmsCategory.sortingType,
  (data, flag, genre, sort) => ({
    data,
    flag,
    genre,
    sort,
  })
);
const selectValuesSerials = createSelector(
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


  const { data, flag, genre, sort } = useSelector(
    mediaType === "movies" ? selectValuesMovies : selectValuesSerials
  );

  const{divClass,checkPath,base_poster,setHideButton,page,setPage,inputEl} = useTypeMedia(changePageThunk,
    filteSortThunk,
    title,
    type,
    mediaType,
    endpoint,
    genre,
    sort,data)

  return (
    sort && (
      <div className="wrapper_conteiner">
        <div className="content_column_wrapper">
          <div className="title_type_media">
            <p>{title}</p>
          </div>
          <div className="content_media">
            <FilterColumn type={type} mediaType={mediaType} />
            <div   className="cards_column">
              <section className="media_results">
                <TransitionGroup component={null}>
                  {data.map((media) => {
                    return (
                      <CSSTransition
                        key={media.id}
                        timeout={500}
                        classNames="my-node"
                      >
                        <Link to={checkPath(media.id)}>
                          <div className="card_media">
                            <div className="card_image_wrapper">
                              <img
                                src={base_poster + media.poster_path}
                                alt=""
                              />
                            </div>
                            <div className="card_text_wrapper">
                              <div className="text_title_card">
                                <p className="title_text">{media.title}</p>
                                <p className="date_text">
                                  {media.release_date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
                {flag === "loading" && <Loader />}
                { page >=1&& data.length >= 20 && (  
                  <div
                  ref={inputEl}
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
