import './filterColumn.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export const FilterColumn=({changeGenre})=>{
    return(
<div className="filters_column">
<Sorting/>
 <Filter changeGenre={changeGenre}/>
</div>
)
}

const Filter=({changeGenre})=>{
    const[open,setOpen]=useState(true)
    const genresArray=[
        'Історичний','Бойовик','Вестерн','Військовий','Детектив','Документальний','Драма','Жахи','Комедія','Кримінал','Мелодрама','Музика','Мультфільм','Пригоди','Сімейний','Телефільм','Трилер','Фантастика','Фентезі'
     ]
    return(
        <div className="filters_media_content">
        <Accordion 
        sx={{minWidth:'260px',width:'260px',boxShadow:'0 2px 8px rgba(0,0,0,.1)',borderRadius:'8px !important',border:'1px solid #e3e3e3'}} 
        expanded={open}  
        onChange={()=>setOpen(!open)}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon  sx={{fill:'#000'}}/>} >
            <Typography sx={{fontSize:'1.1em',fontWeight:'600'}} variant='h2'>Фільтри</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderTop:'1px solid #eee'}}>
        <div className="genres_content">
   <Typography sx={{fontWeight:'300',fontSize:'.9em',color: '#000'}} variant='h3'>Жанри</Typography> 
       <ul>
        {genresArray.map(genre=><li onClick={()=>changeGenre(genre)} className='genre'>{genre}</li>)}
    </ul>
 </div>
        </AccordionDetails>
    </Accordion>
    </div>
    )
}
const Sorting=()=>{
    const typeArr=['Популярні','Непопулярні','Рейтинг високий','Рейтинг низький']
    return(
        <div className="sorting_media_content">
    <Accordion
            sx={{minWidth:'260px',width:'260px',boxShadow: '0 2px 8px rgba(0,0,0,.1)',padding:"0",borderRadius:'8px !important',border:'1px solid #e3e3e3'}} 
    >
        <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{fill:'#000'}}/>} >
        <Typography sx={{fontSize:'1.1em',fontWeight:'600'}} variant='h2'>Сортування</Typography>

        </AccordionSummary>
  <AccordionDetails sx={{borderTop:'1px solid #eee'}}>
  <div className='sorting_type'>
    <Typography sx={{fontWeight:'300px'}} paragraph>Сортувати результати за </Typography>
    <Select 
    defaultValue='Популярні' 
    IconComponent={ArrowDropDownIcon} 
    sx={{marginTop:'15px',width:'100%',height: '33.6px',borderRadius:'0.25em',backgroundColor: '#e4e7eb'}}
      MenuProps={{ style: { position: 'absolute',fontFamily:'Source Sans 3' }, disableScrollLock: true,}} >
            {typeArr.map(type=>{
                return(
                    <MenuItem value={type}>
                        <Typography sx={{fontSize:'.9em',fontWeight:'400'}}>{type}</Typography>
                    </MenuItem>
                )
            })}
    </Select>
</div>
  </AccordionDetails>
    </Accordion>
</div>
    )
}