import { React,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui


import { styled } from '@mui/material/styles';
import { Label } from '@mui/icons-material';

import {  Divider, TextField,IconButton,Button } from '@mui/material';
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


export default function PopupAddDoctor(){
     const [showPassword, setShowPassword] = useState(false);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[contactnumber,setContactNumber]=useState('');
  const[speciality,setSpeciality]=useState('');
  const[education,setEducation]=useState('')
    
    
      



      const navigate=useNavigate();
   
      const postDoc=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:8081/doctor',{
        doctor_name:name,
        doctor_email:email,
        doctor_qualification:education,
        doctor_speciality:speciality,
        doctor_mobile:contactnumber,
        doctor_password:""
      }).then(res=>console.log("Doctor added",res)).catch(err=>console.log(err))
       window.location.reload();
      // navigate("/login/admindashboard");
    }
 
    return(
        <>
         <div style={{float:'right'}}>
          <IconButton type="close" onClick={()=>navigate("/login/admindashboard")}><Iconify icon='eva:close-fill' /></IconButton></div>
            <div className="wrapper" style={{width:350}}>
           
      <form  onSubmit={postDoc}>
      
        <fieldset>
        
          
          <h4>Add Doctor</h4>
          <Divider />
           <TextField type='text' label="Doctor Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
           <br />           <br />

           <TextField   label="Doctor Email" value={email} type="email" onChange={(e)=>setEmail(e.target.value)} required/>
           <br />           <br />

           <TextField  type='text' label="Doctor Education" value={education} onChange={(e)=>setEducation(e.target.value)} required/>
           <br />           <br />

           <TextField required type='text' label="Doctor Speciality" value={speciality}  onChange={(e)=>setSpeciality(e.target.value)} />            
            <br />           <br />

           <TextField type='number' label="Contact Number" value={contactnumber}  onChange={(e)=>setContactNumber(e.target.value)} required />   <br />
        </fieldset>
       <Divider />
        <Button type ="submit"   >Add</Button>
      
      </form>
      </div>
      </>

    );
}



      