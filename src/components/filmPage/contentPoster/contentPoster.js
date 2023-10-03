import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import "../contentPoster/contentPoster.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography } from "@mui/material";

const ContentPoster = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const data = useLoaderData();
  return <Func data={data} />;
};
export default ContentPoster;

const Func = ({ data }) => {
  const [crew, setCrew] = useState(null);
  const [videoUrl, setVideoUrl] = useState({ url: null });
  const [open, setOpen] = useState(false);
  const certification=(dates)=>{
   const usDate=dates.results.filter(c=> c.iso_3166_1 === 'US')
   if(usDate[0].release_dates[0].certification)return usDate[0].release_dates[0].certification
    else return 'NA'
   
   
  }
  const base_youtube = "https://www.youtube.com/watch?v=";
  const backdrop_img='https://image.tmdb.org/t/p/original';
  const base_img = "https://image.tmdb.org/t/p/w500";
  const profile_img = "https://image.tmdb.org/t/p/w185";
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

  useEffect(() => {
    takeCrew();
    setVideoUrl({
      url: data.videos.results.filter((vid) => vid.type === "Trailer")[1],
    });
  }, []);
  useEffect(()=>window.scrollTo(0,0),[])

  const percent =
    data.vote_average > 0 ? Math.round(data.vote_average * 10) : null;

  const circle = (percent / 100) * 359;
  const color = () => {
    if (percent >= 73) {
      return {
        l: "green",
        b: "#1d3222",
      };
    } else if (percent < 73 && percent > 50) {
      return { l: "#fbfdc2", b: "#796f05" };
    } else if (percent > 50) return { l: "#C60000", b: "#D55448" };
    else {
      return { l: "#fbfdc2", b: "#796f05" };
    }
  };

  const takeCrew = () => {
    const director = data.credits.crew.filter(
      (job) => job.department === "Directing"
    );
    const writings = data.credits.crew.filter(
      (job) => job.department === "Writing"
    );

    return setCrew({
      dir: director,
      writ: writings,
    });
  };

  const constructCrew = (dir, cr) => {
    return dir.filter((data) => data.job === cr);
  };
  const buildDate = (date) => {
    if (date) {
      return date.split("-").reverse().join("/");
    }
  };
  const showEmptyCastMessage=()=>{
return(
<div className="text_empty_cast">
  <Typography variant="h2">Вибачте,немає даних про акторів</Typography></div>
) 


  }
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
                  <Typography  variant="poster_title">{data.title}</Typography>
                  <div className="text_content_date">
                    <span className="certification">{certification(data.release_dates)}</span>
                    <Typography component='span' variant="info_media" sx={{marginRight:'13px'}} className="date">
                     
                      {buildDate(data.release_date)} (UA)
                    </Typography>
                    <Box component='span' className="genres" sx={{marginRight:'13px'}}> {data.genres.map((genre, index) => (
                        <Typography variant="info_media" component='span' key={index}>
                        {index === data.genres.length-1? genre.name:genre.name + ','}
                          </Typography>
                      ))}</Box>
                    <Typography variant="info_media" component='span' sx={{position:'relative'}} className="runtime">
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
                      <Typography variant="font700" component='span' sx={{display:'inline-block'}}>Оцінка користувачів</Typography>
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
                <div class="left_white_column">
                  <div class="text_column">
                    <h3>Top Billed Cast</h3>
                  </div>
                  <div class="panel_top_billed_slider">
                    <Swiper
                      modules={[Scrollbar]}
                      slidesPerView={6}
                      spaceBetween={16}
                      scrollbar={{ draggable: true }}
                    >
                      {data.credits.cast.map((actor, index) => {
                        if (index < 9) {
                          return (
                            <SwiperSlide>
                              <Link to={`/persons/${actor.id}`}>
                              <div class="card_container ">
                                {actor.profile_path ? (
                                  <>
                                    <div className="card_block_for_img">
                                      <img
                                        loading="lazy"
                                        src={profile_img + actor.profile_path}
                                        alt=""
                                      />
                                    </div>
                                    <div class="text_for_card">
                                      <p>{actor.name}</p>
                                      <p class="character">{actor.character}</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      style={{ backgroundColor: "#dbdbdb" }}
                                      className="card_block_for_img"
                                    >
                                      <img
                                        style={{ transform: "scale(0.5)" }}
                                        loading="lazy"
                                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                                        alt=""
                                      />
                                    </div>
                                    <div class="text_for_card">
                                      <p>{actor.name}</p>
                                      <p class="character">{actor.character}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                              </Link>
                            
                            </SwiperSlide>
                          );
                        } else return showEmptyCastMessage();
                      })}
                      <SwiperSlide>
                      {/*   <div class="view_more">
                          <p>View more</p>
                        </div> */}
                      </SwiperSlide>
                    </Swiper>
                  </div>
                  <Media data={data} />
                </div>
                <RightColumn data={data} />
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

const RightColumn = ({ data }) => {
  return (
    <div class="right_grey_column">
      <div class="info_status_links">
        <div class="social_links">
          <div class="fb_block">
            <a
              href={`http://www.facebook.com/${data.external_ids.facebook_id}`}
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg"
                alt=""
              />
            </a>
          </div>
          <div class="twitter_block">
            <a href={`https://twitter.com/${data.external_ids.twitter_id}`}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                alt=""
              />
            </a>
          </div>
          <div class="inst_block">
            <a
              href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                alt=""
              />
            </a>
          </div>
          <div class="homepage_block">
            <a href={data.homepage}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div class="status_movie_info">
          <div class="status">
            <strong>Status</strong>
            <p>{data.status}</p>
          </div>
          <div class="original_language">
            <strong>Original Language</strong>
            <p>{data.original_language}</p>
          </div>
          <div class="budget">
            <strong>Budget</strong>
            <p>${new Intl.NumberFormat("en-EN").format(data.budget)}</p>
          </div>
          <div class="revenue">
            <strong>Revenue</strong>
            <p>${new Intl.NumberFormat("en-EN").format(data.revenue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Media = ({ data }) => {
  const [type, setType] = useState("videos");
console.log(data)
  const currentType = (name) => {
    switch (name) {
      case "posters":
        return <Posters data={data} />;
      case "backdrops":
        return <Backdrops data={data} />;
      case "videos":
        return <Video data={data} />;
      default:
        return null;
    }
  };
  return (
    <section class="media">
      <div class="media_menu">
        <h3>Media</h3>
        <ul>
          <li style={{ cursor: "pointer" }} onClick={() => setType("videos")}>
            Videos
            <span>{data.videos.results.length}</span>
            {type === "videos" && <span class="active_class"></span>}
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => setType("backdrops")}
          >
            Backdrops
            <span>{data.images.backdrops.length}</span>
            {type === "backdrops" && <span class="active_class"></span>}
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => setType("posters")}>
            Posters
            <span>{data.images.posters.length}</span>
            {type === "posters" && <span class="active_class"></span>}
          </li>
        </ul>
      </div>
      <div class="media_content">
        <div class="media_scroller">{currentType(type)}</div>
      </div>
    </section>
  );
};
const Posters = ({ data }) => {
  const base_poster = "https://image.tmdb.org/t/p/w500";
  const sortedAvarage = (a, b) => {
    if (a.vote_average > b.vote_average) return -1;
    if (a.vote_average < b.vote_average) return 1;
    return 0;
  };

  return (
    <Swiper
      modules={[Scrollbar]}
      slidesPerView={6}
      spaceBetween={0}
      scrollbar={{ draggable: true }}
    >
      {data.images.posters.toSorted(sortedAvarage).map((media, index) => {
        if (index < 6) {
          return (
            <SwiperSlide>
              <div class="container_for_img">
                <img
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  src={base_poster + media.file_path}
                  alt=""
                />
              </div>
            </SwiperSlide>
          );
        }
        return null;
      })}
      <SwiperSlide>
        <div class="view_more_media">
          <p>View More</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
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
const Backdrops = ({ data }) => {
  const base_backdrop = "https://image.tmdb.org/t/p/w780";
  console.log(data);
  return (
    <Swiper
      modules={[Scrollbar]}
      slidesPerView={2}
      spaceBetween={0}
      scrollbar={{ draggable: true }}
    >
      {data.images.backdrops.map((media, index) => {
        if (index < 6) {
          return (
            <SwiperSlide>
              <div class="container_for_img">
                <img
                  loading="lazy"
                  src={base_backdrop + media.file_path}
                  alt=""
                />
              </div>
            </SwiperSlide>
          );
        }
        return null;
      })}
      <SwiperSlide>
        <div class="view_more_media">
          <p>View More</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
