import './persons.css'
import { useLoaderData, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {Scrollbar} from 'swiper/modules'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';




export default function Person(){
  const[choise,setChoise]=useState('movies')

   const data = useLoaderData()
   console.log(data)
    


useEffect(()=>window.scrollTo(0,0),[])
 
   const moviesKnown=(dep)=>{
        return dep === 'Acting'?data.movie_credits.cast.toSorted((a,b)=>b.popularity-a.popularity):
        data.movie_credits.crew.filter(job=>job.department === dep).toSorted((a,b)=>b.popularity-a.popularity)
   }
 
   const base_url='https://image.tmdb.org/t/p/h632'
   const base_url_poster='https://image.tmdb.org/t/p/w154'
  
    const howOld=(date)=>{
 return  new Date().getFullYear() - new Date(date).getFullYear()  + 'років'
    }


const eng={
  Acting:'Акторська гра',
  Directing:['Режисура','Режисер'],
  Writing:['Сценарій',"Сценарист"],
  0	:'Не вказана',
  1	:"Жіноча",
  2	:"Чоловіча",
  3	:"Не бінарна"

}

   return(
      <div className="wrapper_conteiner">
      <div className="container_info_person">
        <div className="left_person_column">
          <div className="container_profile">
            <div className="poster_profile">
              <div className="profile_img_container">
                <img  src={/* isSuccess&& */base_url+data.profile_path} alt=""/>
              </div>
            </div>
            <div className="column_another_info">
            {/* isSuccess? */
            data.external_ids.facebook_id||
            data.external_ids.twitter_id||
            data.external_ids.instagram_id||
            data.external_ids.youtube_id?
            <div className="social_links">
            {/* isSuccess&& */data.external_ids.facebook_id?
               <div className="icon_link">
               <a href={data.external_ids.facebook_id}>
                 <div className="logo_social">
                   <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg" alt="fb"/>
                 </div>
               </a>
             </div>:null
            }
            {/* isSuccess&& */data.external_ids.twitter_id?
               <div className="icon_link"> <a href={data.external_ids.twitter_id}>
               <div className="logo_social">
                 <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg" alt="twitter"/>
               </div>
             </a>
           </div>:null
           
           }
           {/* isSuccess&& */data.external_ids.instagram_id?
             <div className="icon_link"> <a href={data.external_ids.instagram_id}>
             <div className="logo_social">
               <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg" alt="instagram"/>
             </div>
           </a>
         </div>:null}
            {/* isSuccess&& */data.external_ids.youtube_id?
               <div className="icon_link">
               <a href={data.external_ids.youtube_id}>
                 <div className="logo_social">
                   <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/youtube-de379f898e1a71c488c71075eb00f5c003699069b9cb1f38c8ac7ea99c8a6338.svg" alt="youtube"/>
                 </div>
               </a>
             </div>:null 
            }
           
            </div>
            :null
            /* :null */
            } 
            
         
            </div>
              <div className="facts_about_person">
                <h2>Особиста інформація</h2>
                <ul>
                  <li>
                    <strong>Відомий (-а) за</strong>
                    <p>
                    {/* {data.known_for_department?data.known_for_department === "Acting"? eng[data.known_for_department]: eng[data.known_for_department][0] :null } */}</p></li>
                  <li>
                    <strong>Cтать</strong>
                    <p>
                  {/* isSuccess&& */eng[data.gender]}</p></li>
                  <li>
                    <strong>День народження</strong>
                    <div className="years_field">
                    <p>
                    {/* isSuccess&& */data.birthday } </p>
                    <p p className='ex_years'>({/* isSuccess&& */howOld(data.birthday)})</p>
                    </div>
                 </li>
                  <li>
                    <strong>Місце народження</strong>
                    <p>
                    {/* isSuccess&& */data.place_of_birth}</p></li>
                  <li>
                    <strong>Також відомий (-а) як</strong>
                    <ul>
                      {data.also_known_as&&data.also_known_as.map((res,index)=>(
                        <li key={index}>{res}</li>
                      ))}
                    </ul>
                    </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right_person_column">
            <section>
              <div className="title">
                <h2 className="title_name">
                  <a href="">{/* isSuccess&& */data.name}</a>
                </h2>
              </div>
            </section>
            <section className="wrapper_bio">
               <h3>Біографія</h3> 
             {data.biography.length>0&&data.biography.split("\n\n").length>1?
             <AccordionBio data={data}/> 
              :
             data.biography.split("\n\n").map((text,index)=><p key={index}><p>{text}</p><br /></p>)/* :null */
             }    
                 </section>
            <section className="swiper_movies">
              <div className="known_for">
                <h3>Відомий (-а) за</h3>
                <Swiper
                scrollbar={{
                  draggable:true,
                 hide:false
                }}
                modules={[Scrollbar]}
                className='swiper'
                slidesPerView={6}
                spaceBetween={15}
                
                >
                  {data.known_for_department&&moviesKnown(data.known_for_department).map((res,index)=>{
                   if(index>3&&index<12 ){
                    return(
                      <SwiperSlide
                      className='swiper-slide'>
                      <div className="img_slide">
                    <img loading='lazy' src={res.poster_path&&base_url_poster+res.poster_path} alt=""/>
                  </div>
                  <div className="container_for_title">
                    <p className='title_movie'>{res.title}</p>
                    </div>
                </SwiperSlide>
                    )
                   }else return null
                  })}
                </Swiper>
              </div>
            </section>
            <section  className="works">
             <MyMenu set={setChoise} choise={choise} />
    {/*  {data.movies_credits&&choise === 'serials'&&<Serials data={data.tv_credits.cast} 
     />} */}
     {data.movies_credits&&choise === 'movies'&&<Movies data={data} eng={eng}/>}
            </section>
          </div>
        </div>
        
      </div>
   )
}

const MyMenu=({set,choise})=>{
  const[open,setOpen]=useState(false)
  const anchor=useRef()

  const setClose=()=>{
    setOpen(false)
  }
  const setChoise=(e,type)=>{
   set(type)
    setClose()
  }
  console.log(choise)
return(
  <Box
  sx={{
    position:'absolute',
    width:70,
    left:767,
  }}
  >
   <Button
    ref={anchor}
    onClick={()=>setOpen(true)}          
  >
   <p className='button_name' style={{textTransform: 'none'}}>{choise === 'movies'? "Фільми":"Серіали"}</p>
   <ArrowDropDownIcon sx={{color:'#000'}}/>

  </Button>
  <Popper
  open={open}
  anchorEl={anchor.current}
  >
    <ClickAwayListener onClickAway={setClose}>
    <MenuList>
    <MenuItem onClick={(e)=>setChoise(e,'movies')}><p>Фільми</p></MenuItem>
    <MenuItem onClick={(e=>setChoise(e,"serials"))}><p>Серіали</p></MenuItem>
</MenuList>
    </ClickAwayListener>
    
  </Popper> 
  </Box>
)
}

const AccordionBio=({data})=>{
  const [expanded, setExpanded] = useState(false);
  const handleChange=(bool)=>(event,isExpanded)=>{
    setExpanded(bool)
  }

  return(
    <Accordion
    disabled={expanded}
    onChange={handleChange(true)}
    sx={{boxShadow:"0"}}
    >
   <AccordionSummary 
   expandIcon={!expanded&&<ExpandMoreIcon sx={{color:'rgba(1,180,228)'}} />}
   >
      { data.biography.split("\n\n").map((text,index) => index === 0? <p key={index}><p>{text}</p><br/></p>:null)}
   </AccordionSummary>
   <AccordionDetails>
   {data.biography.split("\n\n").map((text,index)=> index > 0?<p key={index}><p>{text}</p><br/></p>:null)}
 </AccordionDetails>
  </Accordion>
  )
}

const Movies=({data,eng})=>{

  const roleFim=(dep,res)=>{
  if(dep === "Acting"&&!res.character){
    return null
  }
   return dep === 'Acting'?  <span className="group">
                              як
                              <span className="character">
                               {res.character}
                             </span>
                            </span>:
                            <span className="group">
                            <span className="character">...{eng[data.known_for_department][1]}</span>
                          </span>
  }


const sorted=(a,b)=>{
  let dateA=new Date(a.release_date);
  let dateB=new Date(b.release_date);
  if (dateB<dateA) {
    return -1;
  }
  if (dateB>dateA ) {
    return 1;
  }
  return 0;
  }

  const movies=(dep)=>{
    return dep === 'Acting'? data.movie_credits.cast:data.movie_credits.crew.filter(job=>job.department === dep)
    }

  return(
    <div className="container_works_list">
                 <h3 >{data.known_for_department === "Acting"? eng[data.known_for_department]:eng[data.known_for_department][0]} </h3> 
                <table className="works_list">
                   <tbody>
                    {movies(data.known_for_department)
                       .filter(res=>!res.release_date)
                      .toSorted(sorted).map(res=>(
                        <tr key={res.id}>
                          <td>
                          <table className="credit_group">
                          <tbody>
                            <tr>
                            <td className="year">—</td>
                            <td  className={res.character||res.release_date||data.known_for_department !== "Acting"? "separator":"separator no_padding"} >
                              <div className="container_separator">
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg" alt="separator"/>
                              </div>
                            </td>
                            <td className="role_group">
                              <a className="tooltip" href="">
                               <p>{res.title}</p> 
                              </a>
                               {roleFim(data.known_for_department,res)}
                             </td>
                            </tr>
                          </tbody>
                        </table>
                          </td>
                        </tr>
                      ))}  
                      {movies(data.known_for_department)
                       .filter(res=>res.release_date)
                      .toSorted(sorted).map((res,index)=>(
                        <tr key={res.id}>
                          <td>
                          <table className={index === index.length-1?"credit_group no_bottom_border": 'credit_group'}>
                          <tbody>
                            <tr>
                            <td className="year">{new Date(res.release_date).getFullYear()}</td>
                          <td className={res.character||data.known_for_department !== "Acting"? "separator": "separator no_padding"} >
                              <div className="container_separator">
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg" alt="separator"/>
                              </div>
                            </td>
                            <td className="role_group">
                              <a className="tooltip" href="">
                               <p>{res.title}</p> 
                              </a>
                               {roleFim(data.known_for_department,res)}
                             </td>
                            </tr>
                          </tbody>
                        </table>
                          </td>
                        </tr>
                      ))}     
                  </tbody> 
                </table>
              </div>
  )
}


 const Serials=({data})=>{

  const sorted=(a,b)=>{
    let dateA=new Date(a.first_air_date);
    let dateB=new Date(b.first_air_date);
    if (dateB<dateA) {
      return -1;
    }
    if (dateB>dateA ) {
      return 1;
    }
    return 0;
    }



  const originalArray=data.filter((res,index)=>{
    const origIndex=data.findIndex(data=>data.name === res.name)
    return origIndex === index 
   })

const moreInfo=(id)=>{
  const allData=data.filter(res=>res.id === id) 
return(
  allData.map((res,index)=>(
  <>
<span key={index}  className="group">
{res.episode_count&&(res.episode_count === 1? `(${res.episode_count} серія)`:`(${res.episode_count}  серій)`)} 
<span className="character">
{res.character&& 'як ' + res.character}
</span>
</span>
   </>

  ))


)
}

return(
  <div className="container_works_list">
  <h3 >Акторська гра</h3> 
 <table className="works_list">
      <tbody> 
       {originalArray.toSorted(sorted).map((res,index)=>(
         <tr>
           <td>
           <table className={index === index.length-1?"credit_group no_bottom_border": 'credit_group'}>
           <tbody>
             <tr>
             <td className="year">{new Date(res.first_air_date).getFullYear()}</td>
           <td className={res.character||data.known_for_department !== "Acting"? "separator": "separator no_padding"} >
               <div className="container_separator">
                 <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg" alt="separator"/>
               </div>
             </td>
             <td className="role_group">
               <a className="tooltip" href="">
               
                <p> {res.name}</p> 
               </a>
               {moreInfo(res.id)}
              </td>
             </tr>
           </tbody>
         </table>
           </td>
         </tr>
       ))}     
   </tbody>   
 </table>
</div>
)
} 