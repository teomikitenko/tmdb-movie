import './SearchPanel.css'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'


export default function SearchPanel(){
  const[formInput,setFormInput]=useState('')
  const navigate=useNavigate()

const submitform=(e)=>{
    e.preventDefault();
    navigate(`/results/${(JSON.stringify(formInput))}`)
}

    return(
        <div className="wrapper_search_panel">
  <div className="poster_container">
    <img className="image_back" src= 'https://image.tmdb.org/t/p/original//84cS9oEm33jD05T0p39TbwADY8.jpg' alt=""/>
    <div className="content_panel">
    <div className="title">
      <h2>Ласкаво просимо.</h2>
      <h3>Мільйони фільмів, серіалів і персон. Досліджуйте зараз.</h3>
    </div>
    <div className="form_input">
      <form onSubmit={submitform}>
        <input type="text" name='search' onChange={(e)=>setFormInput(e.target.value)} value={formInput} placeholder="Пошук фільму, серіалу, персони..."/>
        <input type="submit" value="Search"/>
      </form>
    </div>
    </div>
        
    </div>
  </div>
    )
}