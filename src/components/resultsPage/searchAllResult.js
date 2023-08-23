import  './resultsPage.css'
import { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../filmPage/searchSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetAllFindQuery } from '../filmPage/searchSlice'



export default function SearchAllResult(){
  const[dataForPanel,setDataForPanel]=useState({
    movies:0,
    tv:0,
    person:0
  })
  const {res}=useParams()
  const{data,isSuccess}=useGetAllFindQuery(JSON.parse(res))
  const dispatch=useDispatch()
  const filterStatus=useSelector(state=>state.searchReducer.filterName)

  const results =  isSuccess&&data.results.filter(res=>res.media_type === filterStatus)
  isSuccess&&console.log(data)

   useEffect(()=>{
    setDataForPanel({
      movies:isSuccess&&data.results.filter(res=>res.media_type === 'movie').length,
      tv:isSuccess&&data.results.filter(res=>res.media_type === 'tv').length,
      person:isSuccess&&data.results.filter(res=>res.media_type === 'person').length
    })
},[isSuccess]);   
const changeFilter=(e,type)=>{
e.preventDefault()
dispatch(filter(type)) 
}

 return(
   <div className="wrapper_conteiner">
  <div className="container_blocks">
    <div className="grey_column">
      <div className="search_bar_info">
        <div className="bar_panel_info">
          <h3>Результати пошуку</h3>
          <div className="search_menu_scroller">
      <ul className="panel_filters">
        <li>
          <a  onClick={(e)=>changeFilter(e,'movie')} href=""> Фільми</a>
          <span>{dataForPanel.movies}</span>
        </li>
        <li>
          <a onClick={(e)=>changeFilter(e,'tv')} href=""> Cеріали</a>
          <span>{dataForPanel.tv}</span>
        </li>
        <li  >
          <a onClick={(e)=>changeFilter(e,'person')} href="">Персони</a>
          <span>{dataForPanel.person}</span>
        </li>
        <li>
          <a href="">Колекції</a>
          <span>0</span>
        </li>
        <li>
          <a href="">Компанії</a>
          <span>0</span>
        </li>
        <li>
          <a href="">Мережі</a>
          <span>0</span>
        </li>
        <li>
          <a href="">Ключові слова</a>
          <span>0</span>
        </li>
      </ul>
    </div>
        </div>
      </div>
    </div>
    <div className="white_column">
      <div className="main_search_info">
        <div className='results_flex'>
         {isSuccess&&<CreateCard allData={data} results={results}/>} 
        </div>
    </div>
  </div>
  </div>
  </div>
 )}

 function CreateCard(props){
  
  const{results,allData}=props
  
  const dispatch = useDispatch()
  
  const trueMonth=(num)=>{
    const months = {
      '01': 'січня',
      '02': 'лютого',
      '03': 'березня',
      '04': 'квітня',
      '05': 'травня',
      '06': 'червня',
      '07': 'липня',
      '08': 'серпня',
      '09': 'вересня',
      '10': 'жовтень',
      '11': 'листопад',
      '12': 'грудня',
  }
  return months[num] || null
  }
  const createDate=(date)=>{
    const myDate=date.split('-').reverse()
    const month = trueMonth(myDate[1]) 
    myDate.splice(1,1,month)
     const text= myDate.join(',').replace(/,/g,' ')
     return text 
   }
   const posterPath=(path,type='ms')=>{
     const base_url='https://image.tmdb.org/t/p/w185'
      return  path?  type === 'person'?
      <div className="profile_poster_card">  
       <img src={base_url + path} alt="" /> 
   </div>: 
       <div className="poster_card">
        <img src={base_url + path} alt="" />
     </div>    
       :
    type !== 'person'? <div className="poster_card_no_image">
        <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt="" />
     </div> :
     <div className="profile_poster_card no_profile_poster">
     <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg' alt="" />
  </div>

     
   }
    const about=(dep,films)=>{
       return(
        <span className='about_profile'>
        <span className="profile_text" >
          <p>{dep}</p>
          <p >{films? films.map(res=>res.title).join(','):null }</p>
        </span>
      </span>
       )
    }
    const profileInfo=(res)=>{
     
    return res.media_type === 'person'?
      <div
      key={res.id} className='profile_card'>
        <Link to={`/persons/${res.id}`}>{posterPath(res.profile_path,'person')}</Link>
     <div className="text_card">
       <div className="info_card">
        <Link to={`/persons/${res.id}`}><h2 className='card_name'>{res.name}</h2></Link> 
       {about(res.known_for_department,res.known_for)}
       </div>
     </div>
   </div> :null
    }
     
    const markup=(result)=>{
      return(
        result.map(res=>(
          res.media_type !== 'person'? 
           <div key={res.id} className="card card_results">
           { res.media_type === 'movie'?
            <Link to={`/films/${res.id}`}>{posterPath(res.poster_path)}</Link>:
           <Link to={`/tv/${res.id}`}>{posterPath(res.poster_path)}</Link> }
           
            <div className="text_card">
              <div className="info_card">
              {res.media_type === 'tv'?
               <Link to={`/tv/${res.id}`}><h2>{res.name}</h2> </Link>:
               <Link to={`/films/${res.id}`}><h2>{res.title}</h2> </Link>}
              <span className="release_date_card">
                {res.media_type === 'tv'? createDate(res.first_air_date) : createDate(res.release_date)}</span>
              </div>
              <div className="overview_card">
             <p>{res.overview}</p>
           </div>
            </div>
          </div> :  profileInfo(res))) 
      )


    }

 
   

    const checkArr=(res)=>{
      dispatch(filter(res.results[0].media_type))
      return null
    }         
  
  return(
   <>
           {allData.results.length>0? results.length > 0?  
         markup(results):
         checkArr(allData)  :
         <NoResults/>}  
        
    </>
  )}
  
  const NoResults=()=>{
    return(
      <div className='profile_card'>
        <p>Немає даних, що відповідають вашому запиту
            </p>
      </div> 
    )
  }