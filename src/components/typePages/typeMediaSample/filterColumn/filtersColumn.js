import "./filterColumn.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  changeSortingType,
  changeFilter,
} from "../../filmsTypePages/filmsTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  changeSerialsFilter,
  changeSerialsSortingType,
} from "../../serialsTypePages/serialsTypeSlice";

const genreSelector = createSelector(
  (state) => state.typeFilmsCategory.genresArray,
  (state) => state.typeSerialsCategory.genresArray,
  (state) => state.typeSerialsCategory.type,
  (state) => state.typeFilmsCategory.type,
  (state) => state.typeSerialsCategory.sortingType,
  (state) => state.typeFilmsCategory.sortingType,
  (
    genresMoviesArray,
    genresSerialsArray,
    serialType,
    filmType,
    serialsSort,
    filmSort
  ) => ({
    genresMoviesArray,
    genresSerialsArray,
    serialType,
    filmType,
    serialsSort,
    filmSort,
  })
);

export const FilterColumn = ({ mediaType }) => {
  const {
    genresMoviesArray,
    genresSerialsArray,
    serialType,
    filmType,
    serialsSort,
    filmSort,
  } = useSelector(genreSelector);

  return (
    <div className="filters_column">
      <Sorting
        mediaType={mediaType}
        filmType={filmType}
        filmSort={filmSort}
        serialType={serialType}
        serialsSort={serialsSort}
      />
      <Filter
        mediaType={mediaType}
        movies={genresMoviesArray}
        serials={genresSerialsArray}
      />
    </div>
  );
};

const Filter = ({ mediaType, movies, serials }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const checkedMediaType = (mediaType) => {
    return mediaType === "movies" ? movies : serials;
  };
  return (
    <div className="filters_media_content">
      <Accordion
        sx={{
          minWidth: "260px",
          width: "260px",
          boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          borderRadius: "8px !important",
          border: "1px solid #e3e3e3",
        }}
        expanded={open}
        onChange={() => setOpen(!open)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fill: "#000" }} />}>
          <Typography
           variant="sorting_title"
          >
            Фільтри
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: "1px solid #eee" }}>
          <div className="genres_content">
            <Typography
             variant="filter_genres"
            >
              Жанри
            </Typography>
            <ul>
              {checkedMediaType(mediaType).map((genre) => (
                <li
                  key={genre.id}
                  onClick={() =>
                    dispatch(
                      mediaType === "movies"
                        ? changeFilter(genre.id)
                        : changeSerialsFilter(genre.id)
                    )
                  }
                  className="genre"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
const Sorting = ({
  filmType,
  serialType,
  mediaType,
}) => {
  const typeArr = {
    Популярні: "popularity.desc",
    Непопулярні: "popularity.asc",
    "Рейтинг високий": "vote_average.desc",
    "Рейтинг низький": "vote_average.asc",
  };
  const checkMediaType = (arg) => {
    return mediaType === "movies"
      ? changeSortingType(arg)
      : changeSerialsSortingType(arg);
  };

  const dispatch = useDispatch();
  return (
    <div className="sorting_media_content">
      <Accordion
        sx={{
          minWidth: "260px",
          width: "260px",
          boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          padding: "0",
          borderRadius: "8px !important",
          border: "1px solid #e3e3e3",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fill: "#000" }} />}>
          <Typography
            variant="sorting_title"
          >
            Сортування
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: "1px solid #eee" }}>
          <div className="sorting_type">
            <Typography variant="sorting_title" >
              Сортувати результати за
            </Typography>
            <Select
              value={mediaType === "movies" ? filmType : serialType}
              IconComponent={ArrowDropDownIcon}
              onChange={(e) => {
                dispatch(
                  checkMediaType({
                    endpoint: typeArr[e.target.value],
                    type: e.target.value,
                  })
                );
              }}
              sx={{
                marginTop: "15px",
                width: "100%",
                height: "33.6px",
                borderRadius: "0.25em",
                backgroundColor: "#e4e7eb",
              }}
              MenuProps={{
                style: { position: "absolute", fontFamily: "Source Sans 3" },
                disableScrollLock: true,
              }}
            >
              {Object.keys(typeArr).map((name) => {
                return (
                  <MenuItem value={name} key={name}>
                    <Typography sx={{ fontSize: "0.9em", fontWeight: "400" }}>
                      {name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
