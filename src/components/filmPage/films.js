import { useLoaderData } from "react-router-dom";
import "./films.css";
import "swiper/css";
import "swiper/css/scrollbar";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography } from "@mui/material";
import RightColumn from "./column/rightColumn/rightColumn";
import LeftColumn from "./column/leftColumn/leftColumn";
import { useMovieMedia } from "../../hooks/media";
const Film = () => {
  const data = useLoaderData();
  const {
    buildDate,
    constructCrew,
    circle,
    color,
    percent,
    base_img,
    base_youtube,
    backdrop_img,
    crew,
    open,
    setOpen,
    videoUrl,
    certification,
    style,
  } = useMovieMedia(data);

  return (
    <div className="wrapper">
      {data ? (
        <div className="wrapper_movies">
          <div className="wrapper_for_poster">
            <img
              className="img_backdrop"
              src={backdrop_img + data.backdrop_path}
              alt=""
            />
            <div className="wrapper_conteiner ">
              <div className="content">
                <div className="content_img">
                  <img
                    className="img_title"
                    src={base_img + data.poster_path}
                    alt="poster"
                  />
                </div>
                <div className="text_content">
                  <Typography variant="poster_title">{data.title}</Typography>
                  <div className="text_content_date">
                    <span className="certification">
                      {certification(data.release_dates)}
                    </span>
                    <Typography
                      component="span"
                      variant="info_media"
                      sx={{ marginRight: "13px" }}
                      className="date"
                    >
                      {buildDate(data.release_date)} (UA)
                    </Typography>
                    <Box
                      component="span"
                      className="genres"
                      sx={{ marginRight: "13px" }}
                    >
                      {" "}
                      {data.genres.map((genre, index) => (
                        <Typography
                          variant="info_media"
                          component="span"
                          key={index}
                        >
                          {index === data.genres.length - 1
                            ? genre.name
                            : genre.name + ","}
                        </Typography>
                      ))}
                    </Box>
                    <Typography
                      variant="info_media"
                      component="span"
                      sx={{ position: "relative" }}
                      className="runtime"
                    >
                      {Math.trunc(data?.runtime / 60)}г {data.runtime % 60}хв
                    </Typography>
                  </div>
                  <div className="rating_info ">
                    <div className="progress_bar trailer">
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
                      <Typography
                        variant="font700"
                        component="span"
                        sx={{ display: "inline-block" }}
                      >
                        Оцінка користувачів
                      </Typography>
                      <div
                        onClick={() => setOpen(true)}
                        className="play_trailer"
                      >
                        <p>Play Trailer</p>
                      </div>
                    </div>
                  </div>
                  <p className="tagline">{data.tagline}</p>
                  <h3 className="auto">Опис</h3>
                  {<p className="text_overview">{data.overview}</p>}

                  {
                    <div className="creator_bottom">
                      <ol className="creator">
                        {data && crew
                          ? constructCrew(crew.dir, "Director").map(
                              (cr, index) => {
                                if (index < 2) {
                                  return (
                                    <li key={index}>
                                      <p className="text_creator">{cr.name}</p>
                                      <p className="position">{cr.job}</p>
                                    </li>
                                  );
                                } else return null;
                              }
                            )
                          : null}
                        {data && crew
                          ? constructCrew(crew.writ, "Writer").map(
                              (cr, index) => {
                                if (index < 3) {
                                  return (
                                    <li key={index}>
                                      <p className="text_creator">{cr.name}</p>
                                      <p className="position">{cr.job}</p>
                                    </li>
                                  );
                                } else return null;
                              }
                            )
                          : null}
                        {data && crew
                          ? constructCrew(crew.writ, "Characters").map(
                              (cr, index) => {
                                if (index < 3) {
                                  return (
                                    <li key={index}>
                                      <p className="text_creator">{cr.name}</p>
                                      <p className="position">{cr.job}</p>
                                    </li>
                                  );
                                } else return null;
                              }
                            )
                          : null}
                      </ol>
                    </div>
                  }
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
                        top: "9px",
                        right: "12px",
                      }}
                    />
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
                <LeftColumn data={data} />
                <RightColumn data={data} />
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};
export default Film;
