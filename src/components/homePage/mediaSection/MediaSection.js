import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../mediaSection/mediaSection.css";
import "swiper/css";
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import { Typography } from "@mui/material";


const MediaSection = ({ period }) => {
  const arr = useSelector((state) => state.filmReducer.trendingFilms);
  console.log(arr)
  return (
    <div key={period} className="conteiner_swiper">
      <Swiper
        scrollbar={{
          hide: false,
          draggable:true, 
        }}
        slidesPerView={8}
        spaceBetween={15}
        modules={[Scrollbar]}
        
      >
        {arr.map((media, index) => {
          return (
            <SwiperSlide key={media.id}> 
               <div className="container_card">
                <div className="img_card">
                <Link to={`films/${media.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
                    alt=""
                  />
                </Link>
                </div>
               <div className="text_card">
                <p className="title_card">{media.media_type === 'tv'?media.name:media.title}</p>
                <Typography sx={{marginTop:'4px'}} variant="date">{media.media_type === 'tv'?media.first_air_date:media.release_date}</Typography>
               </div>
               </div> 
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MediaSection;
