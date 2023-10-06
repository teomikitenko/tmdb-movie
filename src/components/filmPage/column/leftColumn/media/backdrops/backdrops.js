import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

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
  export default Backdrops