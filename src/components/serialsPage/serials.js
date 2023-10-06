import "./serials.css";
import { useLoaderData } from "react-router-dom";
import "swiper/css";
import "swiper/css/scrollbar";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography } from "@mui/material";
import LeftColumnsSerials from "./column/leftColumn/leftColumn";
import RightColumnSerials from "./column/rightColumn/rightColumns";
import { useSerialMedia } from "../../hooks/media";
const Serials = () => {
  const data = useLoaderData();
  const {
    showRatings,
    color,
    percent,
    circle,
    buildDate,
    base_img,
    backdrop_img,
    base_youtube,
    style,
    videoUrl,
    open,
    setOpen,
  } = useSerialMedia(data);

  return (
    <div className="wrapper">
      <div className="wrapper_movies wrapper_serials">
        <div className="wrapper_for_poster">
          <img
            className="img_backdrop"
            src={backdrop_img + data.backdrop_path}
            alt=""
          />
          <div className="wrapper_conteiner">
            <div className="content">
              <div className="content_img">
                <img
                  className="img_title"
                  src={base_img + data.poster_path}
                  alt=""
                />
              </div>
              <div className="text_content">
                <Typography variant="poster_title">{data.name}</Typography>
                <div className="text_content_date">
                  <span className="certification_serials">{showRatings()}</span>
                  <Typography
                    component="span"
                    variant="info_media"
                    sx={{ marginRight: "13px" }}
                    className="date"
                  >
                    {buildDate(data.first_air_date)} (UA)
                  </Typography>
                  <Box
                    component="span"
                    sx={{ marginRight: "13px" }}
                    className="genres"
                  >
                    {data.genres.map((genre, index) => {
                      if (index !== data.genres.length - 1) {
                        return (
                          <Typography
                            variant="info_media"
                            component="span"
                            key={index}
                          >
                            {genre.name},
                          </Typography>
                        );
                      } else
                        return (
                          <Typography
                            variant="info_media"
                            component="span"
                            key={index}
                          >
                            {genre.name}
                          </Typography>
                        );
                    })}
                  </Box>
                </div>
                <div className="rating_info">
                  <div className="progress_bar">
                    {
                      <div
                        style={{
                          background: `conic-gradient(${
                            color().l
                          } ${circle}deg, ${color().b}	0deg )`,
                        }}
                        className="my_circle"
                      >
                        <p className="my_circle_percent">
                          {percent ? percent + "%" : "NA"}
                        </p>
                      </div>
                    }
                    <Typography
                      variant="font700"
                      component="span"
                      sx={{ display: "inline-block" }}
                    >
                      Оцінка користувачів
                    </Typography>
                    <div onClick={() => setOpen(true)} className="play_trailer">
                      <p>Play Trailer</p>
                    </div>
                  </div>
                </div>
                <p className="tagline">{data.tagline}</p>
                <h3 className="auto">Опис</h3>
                {<p className="text_overview">{data.overview}</p>}
                <div className="creator_bottom">
                  <ol className="creator">
                    {data.created_by.map((res, index) => (
                      <li key={index}>
                        <p className="text_creator">{res.name}</p>
                        <p className="position">Creator</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <Modal
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
                      {videoUrl.name && videoUrl.name}
                    </Typography>
                  </Box>

                  <ReactPlayer
                    width="984px"
                    height="553px"
                    url={videoUrl.url && base_youtube + videoUrl.url.key}
                    playing="true"
                    controls="true"
                  />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
        <section className="info_about_film">
          <div class="wrapper_conteiner">
            <div class="content_wrapper_movies">
              <LeftColumnsSerials data={data} />
              <RightColumnSerials data={data} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Serials;
