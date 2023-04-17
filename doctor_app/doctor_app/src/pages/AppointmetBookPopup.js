import {useState} from 'react';
import { Divider, Typography,  IconButton ,Button,TextField} from '@mui/material';
import axios from 'axios';
import BookingFull from './BookFull';
import Popupforms from './Popupform';

import Iconify from '../components/iconify';

// mocks_.
import account from '../_mock/account';


export default function AppointmentBookPopup({val,id}){
  const [address,setAddress]=useState('');
  const[openPopup , setOpenPopup]=useState(false);

  const booking=(val,address,id,event)=>{
    const idd=window.sessionStorage.id;
      axios.post(`http://localhost:8081/booking/${id}/${idd}`, val).then((response)=>{
        if(response==null){
          setOpenPopup(true);
        }
        else{
        console.log(response.data);
        axios.post(`http://localhost:8081/sendConfirmationdoctor/${address}`, response.data)}
      })
     window.location.reload();
    console.log(val);
    console.log(id);
    console.log(window.sessionStorage.id);
  
  }
  
return(
     <> 
    <div style={{width:550}}>
    <fieldset >
     <div style={{float:'right'}}>
      <IconButton type="close" onClick={event => {window.location.href='/login/userdashboard/bookappointment'}}><Iconify icon='eva:close-fill' /></IconButton></div><br/>
    <h2>Confirm By Providing Address</h2>
    <Divider /><br/>
    <Typography> Enter Your Address Here</Typography>
    <Typography variant="subtitle2" >
    <TextField type="text"  width="150" height="50" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
    </Typography><br/>
    

    <Button onClick={()=>{booking(val,address,id)}}>Book</Button>
    </fieldset>
  </div>

  <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <BookingFull />
      </Popupforms>
  </>
  );
}