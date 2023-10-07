import { useForm, useController,Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useEffect } from "react";
const FormConnect = ({ open, setOpen }) => {
  const { handleSubmit,reset,control,formState: { errors,isValid } } = useForm({
    defaultValues: {
      Nickname: "",
      Feedback:''
    },
    mode: "onChange",
  });

  const sendForm = (data) =>{
    console.log(data)
    reset()
};
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height:450,
    backgroundColor: "#fff",
    boxShadow: 20,
    borderRadius:8,
    p: 4,
  };
  console.log(errors)

useEffect(()=>reset(),[open])
console.log(isValid)
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Box sx={{ height:'100%', display:'flex',flexDirection:'column',backgroundColor:'#fff' }}>
        <Typography fontSize='1.2rem' fontWeight='500' sx={{display:'inline-block'}}>Залиште ваш відгук</Typography>  
          <form style={{display:'flex',marginTop:'25px',flexDirection:'column',gap:'10px'}} id="myForm" onSubmit={handleSubmit(sendForm)}>
         
<Controller
name="Nickname"
control={control}
rules={{required:'Закороткий нік',minLength:4}}
render={({ field })=>
<TextField   label='Ваш Нікнейм' {...field}/>
}
/>
{errors.Nickname?
<Typography color='red' variant="caption">Закороткий нік</Typography> :null
}
       
<Controller
name="Feedback"
control={control}
rules={{required:true,minLength:4}}
render={({ field })=>
<TextField label='Ваш відгук' 
multiline
rows={5}
{...field}/>
}
/> 
{errors.Feedback?
  <Typography color='red' variant="caption">Введіть від 6 символів</Typography> :null
}     
         </form>
          <Button disabled={!isValid}  variant="contained" form='myForm' type={isValid&&"submit"} sx={{
            marginTop:'5px',
          }}>Відправити</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default FormConnect;


