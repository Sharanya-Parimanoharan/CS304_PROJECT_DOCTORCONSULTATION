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


export default function BookingFull(){
     
    const handle=()=>{
        window.location.reload();
    }
 
    return(
        <>
         
            <div className="wrapper" style={{width:350}}>
           
      <form  >
      
        
          
          <h3 style={{color:"red"}}>Error !</h3>
          <Divider />
           <Typography >Cannot make booking as the slot is full, Please choose any other slot</Typography>
           <Divider />
        <Button onClick={handle}>Ok</Button>
      
      </form>
      </div>
      </>

    );
}