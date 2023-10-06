import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography } from "@mui/material";

const Video = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState({
      name: "",
      key: "",
    });
  
    const base_youtube = "https://www.youtube.com/watch?v=";
    const prev_youtube = "https://i.ytimg.com/vi/";
  
    const filteredArray = (array) => {
      return array.filter((video) => video.type === "Trailer");
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
    return (
      <>
        <Swiper
          modules={[Scrollbar]}
          slidesPerView={2}
          spaceBetween={0}
          scrollbar={{ draggable: true }}
        >
          {filteredArray(data.videos.results).map((video, index) => {
            if (index < 6) {
              return (
                <SwiperSlide>
                  <div class="container_for_img">
                    <div className="play_circle">
                      <div className="icon_arrow">
                        <PlayArrowIcon
                      
                          onClick={() => {
                            setOpen(true);
                            setVideo({ name: video.name, key: video.key });
                          }}
                          fontSize="large"
                          sx={{
                            position: "absolute",
                            zIndex: "200",
                            fill: "#fff",
                            fontSize:'20px'
                          }}
                        />
                      </div>
                    </div>
                    <img
                      style={{ objectFit: "fill" }}
                      src={prev_youtube + video.key + "/maxresdefault.jpg"}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              );
            }
            return null;
          })}
        </Swiper>
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
                {video.name}
              </Typography>
            </Box>
            <ReactPlayer
              width="984px"
              height="553px"
              url={base_youtube + video.key}
              playing="true"
              controls="true"
            />
          </Box>
        </Modal>
      </>
    );
  };
  export default Video