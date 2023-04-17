import { React,useState ,useReducer} from 'react';
import { styled } from '@mui/material/styles';
import {  IconButton,TextField,Button,RadioGroup,FormControlLabel,Radio,Typography} from '@mui/material';
import axios from 'axios';
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
    const [date, setDate] = useState('');
    const [stime, setStime] = useState('');
    const [etime, setEtime] = useState('');
    const [atime, setAtime] = useState('');
  const[visit,setVisit]=useState(false)
    
      const handleChange = (newValue) => {
      //  setValue(newValue);
      };
      

      const addSched=(e)=>{
        // const avg=atime*60;
        e.preventDefault();
        const hours = (Math.floor(atime / 60));  
        const minutes =(atime % 60);
        const avg= `${hours}:${minutes}`;
        console.log(avg);
        
        axios.put(`http://localhost:8081/doctors/update/${window.sessionStorage.id}`,{
          
          "schedule":[{
            "date":date,
            "stime":stime,
            "etime":etime,
            "atime":avg,
            "homevisit":visit
          }]
        }).then(res=>console.log("Schedule Added",res)).catch(err=>console.log(err))
        
         window.location.reload();
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
        <div className="wrapper" style={{width:250}} >
      
      <form onSubmit={addSched}>
        <fieldset>
          {/* <Label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </Label> */}
          <div style={{float:'right'}}>
          <IconButton type="close" ><Iconify icon='eva:close-fill' /></IconButton>
          </div>
          <h4>Add Doctor Schedule</h4>
          <divider />
           
           <TextField type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} InputProps={{inputProps:{ min: "2023-01-01", max: "2024-01-31"}}} />
           <br />           <br />

           <TextField type="time" name="time" value={stime} onChange={(e)=>{setStime(e.target.value)}} label="Start Time" />            <br />           <br />

           <TextField type="time" name='time' label="End Time" valur={etime} onChange={(e)=>{setEtime(e.target.value)}}/>   <br /><br />
           <TextField type="number" name='time' label='consultation time' value={atime} min="0" max="59" onChange={(e)=>{setAtime(e.target.value)}} style={{width:200}}  /> 
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
      
       <div >
        <Button type="submit" onSubmit={handleSubmit}>Add</Button>
      
        </div>
      </form>
    </div>
      </>

    );
}