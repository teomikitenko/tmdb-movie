import { Outlet,Link } from 'react-router-dom'
import './HeadPage.css'
import Footer from '../footer/footer'
import { useEffect } from 'react'

export default function HeadPage(){
    return(
        
        <div className="wrapper_all">
          

        <header className="wrapper_head">
  <div className="conteiner_for_head ">
    <div className="menu_head">
    <div className="logo">
      <Link to='/'><span>My logo</span></Link>
      </div>
   <div className="nav_bar_menu">
    <ul>
      <li className='li_movies'>
        <span className='movies_category category_menu'>Фільми</span>
        <div className='drop_movies'>
          <ul className='drop_menu_movies'>
          <li className='drop_items_movies'><span className='drop_text' >Популярні</span></li>
          <li className='drop_items_movies'>
            <span className='drop_text'>Зараз у кіно</span>
            </li>
          <li className='drop_items_movies'><span className='drop_text' >Очікувані</span></li>
          <li className='drop_items_movies'><span className='drop_text' >Рейтингові</span></li>
          </ul>
          
        </div>
        </li>
      <li className='li_serials'>
        <span  className='serials_category category_menu'>Серіали</span>
        <div className="drop_serials">
        <ul className='drop_menu_serials'>
          <li className='drop_items_serials'><span className='drop_text' >Популярні</span></li>
          <li className='drop_items_serials'>
            <span className='drop_text'>Cьогодні в ефірі</span>
            </li>
          <li className='drop_items_serials'><span className='drop_text' >Зараз на ТБ</span></li>
          <li className='drop_items_serials'><span className='drop_text' >Рейтингові</span></li>
          </ul>
        </div>
        </li>
      <li className='li_persons'> 
        <span className='persons_category category_menu'>Персони</span>
        <div className="drop_persons">
          <ul className="drop_menu_persons">
          <li className='drop_items_persons'><span className='drop_text'>
            <Link to={'persons'}>Популярні</Link>
            </span></li>
          </ul>
        </div>
        </li>
    </ul>
   </div>
  </div>
</div>
</header>
<main><Outlet/></main>
<footer><Footer/></footer>
        </div>


    )
}