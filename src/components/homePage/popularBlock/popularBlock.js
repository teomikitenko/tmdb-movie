import { useState } from 'react'
import { Link } from "react-router-dom";
import './popularBlock.css'
import "swiper/css";
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import { Typography } from "@mui/material";
import { useGetPopularFilmInCinemaQuery,useGetForRentFilmsQuery,useGetStreamingSerialsQuery } from './popularBlockQuery'

const PopularBlock=()=>{
    const[type,setType]=useState('on streaming')
    const queryArray={
       'on cinema':useGetPopularFilmInCinemaQuery(),
       'for rent':useGetForRentFilmsQuery(),
       'on streaming':useGetStreamingSerialsQuery()
    }
    const date=(date)=>{
        if(date){
            const d=new Date(date)
            return   new Intl.DateTimeFormat('uk',{
            month:'short',
            year: "numeric",
           day:'numeric'
          }).format(d)
        }
 
      
     }
    const{data,isSuccess}=queryArray[type]
    const buttons = [
        { title: "Стримінг", cb: "on streaming" },
        { title: "Прокат", cb: "for rent" },
        { title: "У кінотеатрах", cb: "on cinema" },
       
        
      ];
      const classNames = require("classnames");

     const divClass = classNames({
        swipe_popular_background: true,
        cinema: type === "on cinema",
        streaming: type === "on streaming",
        for_rent: type === "for rent",
      });
return(
    <section className="whats_popular">
<div className="wrapper_conteiner">
<div className="popular_container">
    <div className="title_button_popular">
        <h2>Що є популярним</h2>
        <div className="swap_buttons">
        {buttons.map((b, index) => {
                  return (
                    <Typography
                      key={index}
                      onClick={() => setType(b.cb)}
                      component="span"
                      textAlign="center"
                      fontWeight={600}
                      className={type === b.cb ? "active_text":'no_active_text'}
                      sx={{
                        padding: "4px 21px",
                        position: "relative",
                        zIndex: "500",
                        cursor: "pointer",
                      }}
                    >
                      {b.title}
                    </Typography>
                  );
                })}
            <div className={divClass}></div>
        </div>
    </div>
    <div
    key={type} className="conteiner_swiper">
    <Swiper
        scrollbar={{
          hide: false,
          draggable:true, 
        }}
        slidesPerView={8}
        spaceBetween={15}
        modules={[Scrollbar]}
        
      >
        {isSuccess&&data.results.map(media => {
          return (
            <SwiperSlide key={media.id}> 
               <div className="container_card">
                <div className="img_card">
                <Link to={media.first_air_date? `tv/${media.id}`:`films/${media.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
                    alt=""
                  />
                </Link>
                </div>
               <div className="text_card">
                <p className="title_card">{media.first_air_date?media.name:media.title}</p>
                 <Typography sx={{marginTop:'4px'}} variant="date">{media.first_air_date?date(media.first_air_date):date(media.release_date)}</Typography>
                </div>
               </div> 
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
</div>
</div>
</section>
    )}
export default PopularBlock