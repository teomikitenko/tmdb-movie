import './person.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetPopularPersonsQuery } from './personQuery'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Persons(){
   const[page,setPage]=useState(1)
     const{data,isSuccess}=useGetPopularPersonsQuery(page)



     useEffect(()=>window.scrollTo(0,0),[data])


      const filmsKnow=(films)=>{
   return films
    .filter(res=>res.title !== undefined)
   .map(res=>res.title)
    .join(',')

    }
    const handleChange=(event,page)=>{
     setPage(page)
    }

    return (
        <>
        <div className="wrapper_conteiner">
            <div className="container_block_grid_text">
        <h2 className='popular'>Популярні</h2>  

        <div className="container_grid_persons">   
             <div className="container_person">
                {isSuccess? data.results.map(res=>{
                    const base_url='https://image.tmdb.org/t/p/h632/';
                    const no_pic='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                    return(
                        ( 
                            
                           <Link key={res.id} to={`/persons/${res.id}`}>  <div className="card_flex">
                         {res.profile_path?  <div className="card_person_img">
                             <img src={base_url+res.profile_path} alt=""/>
                            </div> : <div style={{backgroundColor:'#dbdbdb'}}
                             className="card_person_img">
                                 <img src={no_pic} alt=""/>
                                </div>  }
                           
                            <div className="card_text_person">
                               <span>{res.name}</span>
                               <p>{filmsKnow(res.known_for)}</p>
                
                            </div>
                          </div>
                          </Link>
                      ) 
                    )
                }
                ):null}
        </div>
      </div>
  </div>
  <Stack
    justifyContent="center"
    direction='row'>
        <Pagination count={500} onChange={handleChange}/></Stack>
      </div>
              </>
    )
}