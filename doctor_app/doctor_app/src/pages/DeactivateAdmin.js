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


export default function DeactivateAdmin(){
     const navigate=useNavigate();

    const handle=()=>{
        window.location.reload();
    }

    const deactivate=()=>{
        const id=window.sessionStorage.id;
        axios.delete(`http://localhost:8081/doctors/${id}`)
        navigate('/');
    }
 
    return(
        <>
         
            <div className="wrapper" style={{width:350}}>
           
      <form  >
      
        
          
          <h3 style={{color:"red"}}>DEACTIVATE !</h3>
          <Divider />
           <Typography >Are you sure, do you want to deactivate your account?</Typography>
           <Divider />
        <Button onClick={deactivate}>Yes</Button>
        <Button onClick={handle}>No</Button>

      
      </form>
      </div>
      </>

    );
}