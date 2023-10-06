import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MediaSerials from "./media/mediaSerials";
const LeftColumnsSerials=({data})=>{
    const profile_img = "https://image.tmdb.org/t/p/w185";
    const showEmptyCastMessage=()=>{
      return(
      <div className="text_empty_cast">
        <Typography variant="text_error_empty_cast">Вибачте,немає даних про акторів</Typography></div>
      ) }
    return(
      <div class="left_white_column">
      <div class="text_column">
        <h3>Top Billed Cast</h3>
      </div>
      {data.credits.cast.length > 0 ?
      <div class="panel_top_billed_slider_serials">
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
                <Link key={actor.id} to={`/persons/${actor.id}`}>
                  <div class="card_container">
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
          } else return null
        })}
        <SwiperSlide>
          <div class="view_more">
            <p>View more</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
      : showEmptyCastMessage()}
     
      <MediaSerials data={data} />
    </div>
    )
  }
  export default LeftColumnsSerials