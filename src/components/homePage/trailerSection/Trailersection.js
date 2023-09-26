import "./trailerSection.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Typography, Box, Modal } from "@mui/material";
import { useState } from "react";
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
  const[open,setOpen]=useState(false)
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
  return (
    <section className="trailers">
      <div className="wrapper_conteiner">
        <div className="trailers_conteiner">
          <div className="wrap_video_content">
            <div className="title_trailers_buttons">
              <Typography variant="title_block">Останні Трейлери</Typography>
              <div className="wrap_button_swipe">
                {buttons.map((b) => {
                  return (
                    <Typography
                      onClick={() => setType(b.cb)}
                      component="span"
                      textAlign="center"
                      fontWeight={600}
                      sx={{ padding: "2px 21px" }}
                    >
                      {b.title}
                    </Typography>
                  );
                })}
              </div>
            </div>
            <div className="video_trailers_swiper">
              <Swiper
                key={type}
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
                        <SwiperSlide key={m.id}>
                          <div className="wrap_trailer_img">
                            <img src={base_poster + m.backdrop_path} alt="" />
                            <div className="icon_arrow_trailers">
                              <PlayArrowIcon
                                onClick={() =>{
                                    setId(m.id)
                                    setOpen(true)
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
                              {m.title}
                            </Typography>
                          </div>
                        </SwiperSlide>
                      );
                    } else return null;
                  })}
              </Swiper>
              {id&&<Player type={type} id={id} open={open} setOpen={setOpen} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Player = ({ type, id,open,setOpen }) => {
   const base_youtube = "https://www.youtube.com/watch?v=";
const filterTrailer=(data)=>{
  const trailer= data.results.filter(t=>t.type ==="Trailer")
 return trailer[0].key
}
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
  console.log(data);
  console.log(isSuccess&&filterTrailer(data))

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
            {/* {video.name} */}
          </Typography>
        </Box>
        <ReactPlayer
          width="984px"
          height="553px"
            url={isSuccess&&base_youtube + filterTrailer(data)}
           playing="true"
          controls="true"
        />
      </Box>
    </Modal>
  );
};
export default TraiLerSection;
