import './trailerSection.css'
import "swiper/css";
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import { Typography } from '@mui/material';


const TraiLerSection=()=>{
return(
    <section className="trailers">
       <div className="content_video">
   <img src="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
    </div>  
    <div className="wrapper_conteiner">
      <div className="wrap_video_content">
        <div className="title_trailers_buttons">
            <h2>Останні Трейлери</h2>
            <div className="wrap_button_swipe">
                <Typography component='span' textAlign='center' fontWeight={600} sx={{padding:'2px 21px' }}>На ТБ</Typography>
                <Typography component='span' textAlign='center' fontWeight={600} sx={{padding:'2px 21px' }}>На стримінгу</Typography>
                <Typography component='span' textAlign='center' fontWeight={600} sx={{padding:'2px 21px' }}>В кінотеатрах</Typography>
            </div>

        </div>
        <div className="video_trailers_swiper">
            <Swiper
             scrollbar={{
                hide: false,
                draggable:true, 
              }}
              slidesPerView={4}
              spaceBetween={25}
              modules={[Scrollbar]}
            >
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
             <SwiperSlide>
                <div className="wrap_trailer_img">
                    <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg" alt="" />
                </div>
             </SwiperSlide>
            </Swiper>
        </div>
      </div>
    </div>  
   
   </section>
    
)}
export default TraiLerSection