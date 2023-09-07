import './filterColumn.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FilterColumn=()=>{

    return(
<div className="filters_column">
<div className="sorting_media_content">
<div className='sorting_type'>
    <p>Сортувати результати за </p>
<select name="select" id="">
<option value="value1" selected>Популярні</option>
  <option value="value2" >Непопулярні</option>
  <option value="value3">Рейтингові</option>
</select>
</div>
</div>
 <Filter/>
</div>
)
}

const Filter=()=>{
    const[open,setOpen]=useState(true)
    const genresArray=[
        'Історичний','Бойовик','Вестерн','Військовий','Детектив','Документальний','Драма','Жахи','Комедія','Кримінал','Мелодрама','Музика','Мультфільм','Пригоди','Сімейний','Телефільм','Трилер','Фантастика','Фентезі'
     ]
    return(
        <div className="filters_media_content">

        <Accordion 
        sx={{minWidth:'260px',width:'260px'}} 
        expanded={open}  
        onChange={()=>setOpen(!open)}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon  sx={{fill:'#000'}}/>} >
            <Typography sx={{fontSize:'1.1em',fontWeight:'600'}} variant='h2'>Фільтри</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="genres_content">
   <Typography sx={{fontWeight:'300',fontSize:'.9em',color: '#000'}} variant='h3'>Жанри</Typography> 
       <ul>
        {genresArray.map(genre=><li className='genre'>{genre}</li>)}
    </ul>
 </div>
        </AccordionDetails>
    </Accordion>
    </div>
    )
}
const Sorting=()=>{
    return(
        <div>hi</div>
    )
}