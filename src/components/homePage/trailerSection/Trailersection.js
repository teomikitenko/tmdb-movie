import "./trailerSection.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Typography, Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useGetMoviesTrailersQuery,
  useGetSerialsOnTvTrailersQuery,
  useGetSerialsTrailersQuery,
  useGetFindSerialsTrailersQuery,
  useGetFindMoviesTrailersQuery,
} from "./trailersQuery";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const TraiLerSection = () => {
  const [type, setType] = useState("on cinema");
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const classNames = require("classnames");

  const base_poster = "https://image.tmdb.org/t/p/w500/";
  const endpoints = {
    "on cinema": useGetMoviesTrailersQuery(),
    serials: useGetSerialsTrailersQuery(),
    "on tv": useGetSerialsOnTvTrailersQuery(),
  };
  const buttons = [
    { title: "Фільми", cb: "on cinema" },
    { title: "Серіали", cb: "serials" },
    { title: "Зараз на ТВ", cb: "on tv" },
  ];
  const { data, isSuccess } = endpoints[type];
  const btnClass = classNames({
    button_selected: true,
    films: type === "on cinema",
    on_tv: type === "on tv",
    serials: type === "serials",
  });
  return (
    <section className="trailers">
      <div className="wrapper_conteiner">
        <div className="trailers_conteiner">
          <div className="wrap_video_content">
            <div className="title_trailers_buttons">
              <Typography variant="title_block">Останні Трейлери</Typography>
              <div className="wrap_button_swipe ">
                {buttons.map((b, index) => {
                  return (
                    <Typography
                      key={index}
                      onClick={() => setType(b.cb)}
                      component="span"
                      textAlign="center"
                      fontWeight={600}
                      className={type === b.cb && "active_buttons"}
                      sx={{
                        padding: "2px 21px",
                        position: "relative",
                        zIndex: "500",
                        cursor: "pointer",
                      }}
                    >
                      {b.title}
                    </Typography>
                  );
                })}
                <div className={btnClass}></div>
              </div>
            </div>
            <div key={type} className="video_trailers_swiper">
              <Swiper
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                slidesPerView={4}
                spaceBetween={25}
                modules={[Scrollbar]}
              >
                {isSuccess &&
                  data.results.map((m, index) => {
                    if (index < 7) {
                      return (
                        <SwiperSlide key={index}>
                          <div className="wrap_trailer_img">
                            <img src={base_poster + m.backdrop_path} alt="" />
                            <div className="icon_arrow_trailers">
                              <PlayArrowIcon
                                onClick={() => {
                                  setId(m.id);
                                  setOpen(true);
                                }}
                                sx={{
                                  fill: "#fff",
                                  fontSize: "65px",
                                  transition: " all 200ms ease-in-out",
                                }}
                              />
                            </div>
                          </div>
                          <div className="swiper_title_trailer">
                            <Typography
                              variant="h6"
                              textAlign="center"
                              sx={{ marginTop: "10px" }}
                            >
                              {m.title?m.title:m.name}
                            </Typography>
                          </div>
                        </SwiperSlide>
                      );
                    } else return null;
                  })}
              </Swiper>
              {open && (
                <Player type={type} id={id} open={open} setOpen={setOpen} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Player = ({ type, id, open, setOpen }) => {
  const base_youtube = "https://www.youtube.com/watch?v=";
  const filterTrailer = (data) => {
    const trailer = data?.results.filter((t) => t.type === "Trailer");
    if (trailer.length > 0) return trailer[0];
    else return data.results[0];
  };
  const checkType = (type) => {
    const f =
      type !== "on cinema"
        ? filterTrailer(data).name
        : filterTrailer(data).title;
    return f;
  };
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0, 0, 0)",
    minWidth: "90px",
    minHeight: "50px",
    width: "984px",
    height: "553px",
    zIndex: "300",
  };
  const findTrailer = {
    "on cinema": useGetFindMoviesTrailersQuery,
    serials: useGetFindSerialsTrailersQuery,
    "on tv": useGetFindSerialsTrailersQuery,
  };
  const { data, isSuccess } = findTrailer[type](id);
  console.log(isSuccess && data);
  console.log(isSuccess && data.results);

  const errorMessage = () => {
    return (
      <Typography variant="h5" color="red">
        Вибачте,нажаль трейлера немає
      </Typography>
    );
  };
  const checkExistVideo = () => {
    if (data.results.length > 0) {
      return checkType(type);
    } else return errorMessage();
  };
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box sx={style}>
        <CloseIcon
          onClick={() => setOpen(false)}
          fontSize="small"
          sx={{
            cursor: "pointer",
            fill: "grey",
            position: "absolute",
            top: "25px",
            right: "17px",
          }}
        />
        <Box sx={{ flexGrow: "1", padding: " 23px 0 0 40px;" }}>
          <Typography
            sx={{
              color: "white !important",
              fontWeight: "700",
              fontSize: "1.13rem",
            }}
          >
            {isSuccess && checkExistVideo()}
          </Typography>
        </Box>
        {isSuccess && data.results.length > 0 ? (
          <ReactPlayer
            width="984px"
            height="553px"
            url={isSuccess && base_youtube + filterTrailer(data).key}
            playing="true"
            controls={true}
          />
        ) : null}
      </Box>
    </Modal>
  );
};
export default TraiLerSection;
