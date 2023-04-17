import { useState } from 'react';
import { Divider, Typography,  IconButton,TextField,Button} from '@mui/material';
import axios from 'axios';
import Iconify from '../components/iconify';

// mocks_
import account from '../_mock/account';
import ScheduleTime from './ScheduleTime';

export default function DoctorProfile(){

  const[accountt,setAccount]=useState({
    "doctor_name":window.sessionStorage.name,
    "doctor_email":window.sessionStorage.email,
    "doctor_mobile":window.sessionStorage.mobile,
    "doctor_speciality":window.sessionStorage.speciality,
    "doctor_qualification":window.sessionStorage.education
  });

  const[tempaccount,setTempaccount]=useState(accountt);
 
  const handleEditSubmit=(event)=>{
    event.preventDefault();
    if(window.confirm("Are you sure you want to update this record ? ")){
      axios.put(`http://localhost:8081/doctors/update/${window.sessionStorage.id}`,tempaccount).then((response)=>{
      setAccount(tempaccount);
         });
      axios.put(`http://localhost:8081/update/${window.sessionStorage.userid}`,{email:tempaccount.doctor_email})
      window.sessionStorage.setItem("name",tempaccount.doctor_name);
      window.sessionStorage.setItem("email",tempaccount.doctor_email);
      window.sessionStorage.setItem("mobile",tempaccount.doctor_mobile);
      window.sessionStorage.setItem("education",tempaccount.doctor_qualification);
      window.sessionStorage.setItem("speciality",tempaccount.doctor_speciality);
      window.location.reload();

    }
  }
    return(
      
    <div style={{width:550}}>
    <fieldset >
     <div style={{float:'right'}}>
      <IconButton type="close" onClick={event => {window.location.href='/login/doctordashboard/scheduletime'}}><Iconify icon='eva:close-fill' /></IconButton></div><br/>
    <h2>Your Profile</h2>
    <Divider />

    <TextField
                
                id="outlined-required"
                label="Name :"
                value={tempaccount.doctor_name}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,doctor_name:e.target.value});
                }}
               /><br /><br/>
                  <TextField
                
                id="outlined-required"
                label="Speciality :"
               // value="Physician"
                value={tempaccount.doctor_speciality}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,doctor_speciality:e.target.value});
                }}
               /><br/><br/>
               <TextField
                id="outlined-required"
                label="Email ID: :"
                value={tempaccount.doctor_email}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,doctor_email:e.target.value});
                }}
               /><br/><br/>
               <TextField
                id="outlined-required"
                label="Contact Number :"
                value={tempaccount.doctor_mobile}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,doctor_mobile:e.target.value});
                }}
               /><br/><br/>
                <TextField
                id="outlined-required"
                label="Education :"
               // value="MBBS"
                 value={tempaccount.doctor_qualification}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,doctor_qualification:e.target.value});
                }}
               /><br/><br/>
             

               <Button onClick={handleEditSubmit}>Save</Button> <Button onClick={(e)=>{setTempaccount({...accountt})}}>Cancel</Button>




    </fieldset>
  </div>
  );
}