import { useForm, useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const FormConnect = ({ open, setOpen }) => {
    console.log('render form')
  const { handleSubmit,reset,control } = useForm({
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
    height: 400,
    backgroundImage: "radial-gradient(at 30% top,#031d33 0%,rgba(3,37,65,1) 70%);",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { field:nickname } = useController({ name: 'Nickname',control })
  const { field:feedback } = useController({ name: 'Feedback',control })


  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Box sx={{ height:'50%', display:'flex',flexDirection:'column',backgroundColor:'#fff' }}>
          <form style={{display:'flex',flexDirection:'column',gap:'10px'}} id="myForm" onSubmit={handleSubmit(sendForm)}>
          <Input {...nickname}/>
          <TextField {...feedback}/>
         </form>
          <Button form='myForm' type="submit" sx={{background: 'linear-gradient(to right,rgba(192,254,207,1) 0%,rgba(30,213,169,1) 100%)'}}>Відправити</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default FormConnect;


