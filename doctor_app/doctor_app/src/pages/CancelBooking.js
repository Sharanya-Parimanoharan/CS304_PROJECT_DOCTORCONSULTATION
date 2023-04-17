import { React,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui


import { styled } from '@mui/material/styles';
import { Label } from '@mui/icons-material';

import {  Divider, TextField,IconButton,Button ,Typography} from '@mui/material';
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


export default function CancelBooking({val,id}){
     
    const handle=()=>{
        if(val==="null"){
            axios.delete(`http://localhost:8081/schedules/${id}`);
           // navigate('/login/doctordashboard/scheduletime')
           console.log(id);
        }
        else{
            
        axios.delete(`http://localhost:8081/appointments/${id}`);
        axios.post('http://localhost:8081/cancelled',val);
    }
    window.location.reload();

    }
    const handleCancel=()=>{
        window.location.reload();
    }
 
    return(
        <>
         
            <div className="wrapper" style={{width:350}}>
           
      <form  >
      
        
          
          <h3 style={{color:"Bleck"}}>Confirm Cancel</h3>
          <Divider />
          <br/>
           <Typography >Are you sure, do you want to cancel ?</Typography>
           <Divider />
           <br/>
        <Button onClick={handle} >Yes</Button>
        <Button onClick={handleCancel}>Cancel</Button>

      
      </form>
      </div>
      </>

    );
}