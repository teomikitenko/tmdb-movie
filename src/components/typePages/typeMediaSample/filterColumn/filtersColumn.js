import "./filterColumn.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { changeSortingType, changeFilter } from "../../filmsTypePages/filmsTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const genreSelector=createSelector(
  state => state.typeFilmsCategory.genresArray,
  state => state.typeSerialsCategory.genresArray,
  (genresMoviesArray,genresSerialsArray)=>({genresMoviesArray,genresSerialsArray})
)


export const FilterColumn = ({type,mediaType}) => {
  
  return (
    <div className="filters_column">
      <Sorting type={type} />
      <Filter mediaType={mediaType} />
    </div>
  );
};

const Filter = ({mediaType}) => {
  const [open, setOpen] = useState(true);
const {genresMoviesArray,genresSerialsArray}=useSelector(genreSelector)
  const dispatch = useDispatch();

  const checkedMediaType=(mediaType)=> {
   return mediaType === 'movies'? genresMoviesArray : genresSerialsArray
  }
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
            sx={{ fontSize: "1.1em", fontWeight: "600" }}
            variant="h2"
          >
            Фільтри
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: "1px solid #eee" }}>
          <div className="genres_content">
            <Typography
              sx={{ fontWeight: "300", fontSize: ".9em", color: "#000" }}
              variant="h3"
            >
              Жанри
            </Typography>
            <ul>
              {checkedMediaType(mediaType).map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => dispatch(changeFilter(genre.id))}
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
const Sorting = (props) => {
  const typeArr = {
    'Популярні': "popularity.desc",
    'Непопулярні': "popularity.asc",
    "Рейтинг високий": "vote_average.desc",
    "Рейтинг низький": "vote_average.asc",
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
            sx={{ fontSize: "1.1em", fontWeight: "600" }}
            variant="h2"
          >
            Сортування
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: "1px solid #eee" }}>
          <div className="sorting_type">
            <Typography sx={{ fontWeight: "300px" }} paragraph>
              Сортувати результати за{" "}
            </Typography>
            <Select
              defaultValue={props.type}
              IconComponent={ArrowDropDownIcon}
              onChange={(e) =>{
                dispatch(changeSortingType(typeArr[e.target.value]))
                console.log(typeArr[e.target.value])
              }
              
              }
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
