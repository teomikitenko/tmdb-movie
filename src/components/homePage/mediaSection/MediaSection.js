import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../mediaSection/mediaSection.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Typography } from "@mui/material";
import { useGetTrendingMediaQuery } from "../inTrendQuery";
const MediaSection = ({ period }) => {
  const { data, isSuccess } = useGetTrendingMediaQuery(period);

  const date = (date) => {
    if (date) {
      const d = new Date(date);
      return new Intl.DateTimeFormat("uk", {
        month: "short",
        year: "numeric",
        day: "numeric",
      }).format(d);
    }
  };
  return (
    <>
      <div className="background_green"></div>
      <div key={period} className="conteiner_swiper">
        <Swiper
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          slidesPerView={8}
          spaceBetween={15}
          modules={[Scrollbar]}
        >
          {isSuccess &&
            data.results.map((media) => {
              return (
                <SwiperSlide key={media.id}>
                  <div className="container_card">
                    <div className="img_card">
                      <Link
                        to={
                          media.first_air_date
                            ? `tv/${media.id}`
                            : `films/${media.id}`
                        }
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="text_card">
                      <p className="title_card">
                        {media.first_air_date ? media.name : media.title}
                      </p>
                      <Typography sx={{ marginTop: "4px" }} variant="date">
                        {media.first_air_date
                          ? date(media.first_air_date)
                          : date(media.release_date)}
                      </Typography>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default MediaSection;
