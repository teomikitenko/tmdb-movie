import './footer.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useState } from 'react'
import FormConnect from './form'

const Footer=()=>{
    const[open,setOpen]=useState(false)
    const films=[
        {title:'Популярні',page:'/popular-films'},
        {title:'Зараз в кіно',page:'/now-playing'},
        {title:'Очікувані',page:'/upcoming-films'},
        {title:'Рейтингові',page:'/top-rated-movies'}
    ]
    const serials=[
        {title:'Популярні',page:'/popular-serials'},
        {title:'Сьогодні в ефірі',page:'/on-air-today'},
        {title:'Зараз на ТБ',page:'/on-tv'},
        {title:'Рейтингові',page:'/top-rated-serials'}
    ]
    const persons=[
        {title:'Популярні',page:'/persons'}
    ]
    return(
        <div className='footer' >
            <div className="wrapper_conteiner">
            <div className="container_footer">
                <div className="logo_container_footer">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo" />
                </div>
                <div className="text_fields_footer">
                    <div className="films_footer">
                    <ul>
                        <Typography variant='footer_title'>Фільми</Typography></ul>
                    {films.map((f,index)=><li key={index}>
                        <Link to={f.page}>
                        <Typography variant='footer_list'> {f.title}</Typography>
                        </Link>
                        </li>)}
                    </div>
                   <div className="serials_footer">
                   <ul>
                    <Typography variant='footer_title'>Серіали</Typography></ul>
                   {serials.map((f,index)=><li key={index}>
                        <Link to={f.page}>
                        <Typography variant='footer_list'> {f.title}</Typography>
                        </Link>
                        </li>)}
                   </div>
                   <div className="persons_footer">
                    <ul>
                        <Typography variant='footer_title'>Персони</Typography>
                    </ul>
                    {persons.map((f,index)=><li key={index}>
                        <Link to={f.page}>
                            <Typography variant='footer_list'> {f.title}</Typography>
                           </Link>
                        </li>)}
                   </div>
                   <div className="feedback_form">
                <Typography variant='footer_title' sx={{cursor:'pointer'}} onClick={()=>setOpen(!open)} >
                    Залиште побажання</Typography>
                </div>
                </div>
           <FormConnect setOpen={setOpen} open={open}/> 
            </div>
            </div>
         
            
        </div>
    )
}
export default Footer;