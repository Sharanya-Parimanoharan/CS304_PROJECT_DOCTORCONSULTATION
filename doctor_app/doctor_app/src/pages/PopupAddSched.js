import { React,useState ,useReducer} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui

import { styled } from '@mui/material/styles';
import { Link, Stack, IconButton, InputAdornment,Radio, TextField, Checkbox, colors, Divider ,Button,RadioGroup,FormControlLabel,Typography} from '@mui/material';

import Iconify from '../components/iconify';


const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
 }   
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
export default function PopupAddSched(){
     const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(null);
    const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[number,setContactNumber]=useState('');
  const[stime,setStime]=useState('');
  const[etime,setEtime]=useState('');
  const[atime,setAtime]=useState('');
  const[date,setDate]=useState('');
  const[visit,setVisit]=useState(false)

      const handleChange = (newValue) => {
        setValue(newValue);
      };

      const navigate=useNavigate();
   
      const postDoc=(e)=>{
        e.preventDefault();
        console.log(stime);
        console.log(visit);
        console.log(email);
        const hours = (Math.floor(atime / 60));  
        const minutes =(atime % 60);
        const avg= `${hours}:${minutes}`;
        console.log(avg);

        axios.put(`http://localhost:8081/doctor/schedule/${email}`,{
        
        "schedule":[{
          "date":date,
          "stime":stime,
          "etime":etime,
          "atime":avg,
          "homevisit":visit

        }]
      }).then(res=>{ window.location.reload();})
     
      //  navigate("/login/admindashboard");
    }

      const [formData, setFormData] = useReducer(formReducer, {});
      const [submitting, setSubmitting] = useState(false);
    
      const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
    
        setTimeout(() => {
          setSubmitting(false);
        }, 3000)
      } 
 
    return(
      
        <>
      <div style={{float:'right'}}>

     <IconButton type="close" onClick={()=>{window.location.reload()}}><Iconify icon='eva:close-fill' /></IconButton></div>
     <div className="wrapper" style={{width:650}}>

      <form  onSubmit={postDoc}>
      <fieldset>

        
          <h4>Add Doctor Schedule</h4>
          <Divider />
          <TextField name="Email" label="Email" type="emails" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
           <br />           <br />
           <TextField name="name" label="Doctor Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
           <br />           <br />
           
           <TextField type="date"   value={date} onChange={(e)=>setDate(e.target.value)} required/>
           <br />           <br />

           <TextField type="time" name="time" label="Start Time" value={stime} onChange={(e)=>setStime(e.target.value)} required />        
           <br/><br/>
           <TextField type="time" name='time' label="End Time" value={etime}  onChange={(e)=>setEtime(e.target.value)} required/>
         <br/> <br/>
           <TextField type="number" name='number' label="Consultation Time" value={atime}  onChange={(e)=>setAtime(e.target.value)} required/> 

            <br/><br/>

          
           <TextField name="number" label="Contact" value={number} onChange={(e)=>setContactNumber(e.target.value)} required/>
           <br/><br/>
           <Typography>Home Visit</Typography>
           <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={visit}
              >
            
                  <FormControlLabel  control={<Radio />} label="YES"  value="true" onChange={(e)=>setVisit(true)} />
                  <FormControlLabel  control={<Radio />} label="NO" value="false"  onChange={(e)=>setVisit(false)} />

         </RadioGroup>        
         </fieldset>
         <Divider/>
       <Button type="submit" onSubmit={postDoc} >Add</Button>
         
      </form>
     </div>

    </>

    );
}