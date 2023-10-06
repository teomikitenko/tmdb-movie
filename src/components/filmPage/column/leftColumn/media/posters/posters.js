import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";


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
  export default Posters 