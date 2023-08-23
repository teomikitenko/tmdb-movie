
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import '../components/filmCards.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Keyboard } from 'swiper/modules';


function FilmCards() {
    const arr=useSelector(state=>state.filmReducer.trendingFilms)
    return (
<div className="conteiner_swiper">
<Swiper 
       slidesPerView={5}
       spaceBetween={30}
       loop={true}
     
       navigation={true}
       modules={[Navigation,Keyboard]}
       keyboard={true}

      className='film_cards'
      >
        {arr.map((film,index)=>{
          return(
            <SwiperSlide  key={index}>
              <Link to={`films/${film.id}`}>
              <img  src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`} alt="" />
              </Link>
              </SwiperSlide>
              )
        })}
      </Swiper>
</div>
    )}
   
     
 
  
  export default FilmCards;