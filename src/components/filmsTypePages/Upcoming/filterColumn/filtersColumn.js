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
import { changeSortingType, changeFilter } from "../../filmsTypeSlice";
import { useDispatch } from "react-redux";

export const FilterColumn = ({type}) => {
  
  return (
    <div className="filters_column">
      <Sorting type={type} />
      <Filter />
    </div>
  );
};

const Filter = () => {
  const [open, setOpen] = useState(true);

  const genresArray = [
    {
      id: 36,
      name: "Історичний",
    },
    {
      id: 28,
      name: "Бойовик",
    },
    {
      id: 37,
      name: "Вестерн",
    },
    {
      id: 10752,
      name: "Військовий",
    },
    {
      id: 9648,
      name: "Детектив",
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
      id: 27,
      name: "Жахи",
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
      id: 10749,
      name: "Мелодрама",
    },
    {
      id: 10402,
      name: "Музика",
    },
    {
      id: 16,
      name: "Мультфільм",
    },
    {
      id: 12,
      name: "Пригоди",
    },
    {
      id: 10751,
      name: "Сімейний",
    },
    {
      id: 10770,
      name: "Телефільм",
    },
    {
      id: 53,
      name: "Триллер",
    },
    {
      id: 878,
      name: "Фантастика",
    },
    {
      id: 14,
      name: "Фентезі",
    },
  ];
  const dispatch = useDispatch();
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
              {genresArray.map((genre) => (
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
