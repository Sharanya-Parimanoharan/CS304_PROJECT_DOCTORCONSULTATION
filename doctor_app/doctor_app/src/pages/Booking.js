import { React,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui


import { styled } from '@mui/material/styles';
import { Label } from '@mui/icons-material';

import {  Divider, TextField,IconButton,Button ,Typography} from '@mui/material';
import Iconify from '../components/iconify';
import BookFull from './BookFull';
import Popupforms from './Popupform';

import AppointmentBookPopup from './AppointmetBookPopup';




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


export default function Booking({id,id1,sch,val}){
     const [openPopup,setOpenPopup]=useState(false);
     const [openPopupBook,setOpenPopupBook]=useState(false);
    const[idd,setId]=useState(0)
;     const[book,setBook]=useState([])
    const handle=()=>{
        window.location.reload();
    }
    const handleBook=()=>{
        if(sch.homevisit===false){
            axios.post(`http://localhost:8081/booking/${id}/${id1}`, val).then((response)=>{
            console.log(response.data);
            if(response.data.schedule!=null)
            {axios.post('http://localhost:8081/sendConfirmation',response.data);}
            else{
              setOpenPopupBook(true);        }
          
           })}
          else{
            setBook(val)
            setId(id);
          setOpenPopup(true);
        
        }
        window.location.reload();
    }
 
    return(
        <>
         
            <div className="wrapper" style={{width:350}}>
           
      <form  >
      
        
          
          <h3 style={{color:"Green"}}>Confirm Booking !</h3>
          <Divider /><br/>
           <Typography >Are you sure, do you want to make a booking ?</Typography>
           <Divider /><br/>
        <Button onClick={handleBook}>Yes</Button>
        <Button onClick={handle}>Cancel</Button>
      
      </form>
      </div>

      <Popupforms
        openPopup={openPopupBook}
        setOpenPopup={setOpenPopupBook}>
          < BookFull/>
      </Popupforms>
      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          < AppointmentBookPopup  val={book} id={idd}/>
      </Popupforms>
      </>

    );
}