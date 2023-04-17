import { useState } from 'react'
import { Divider, IconButton,TextField,Button} from '@mui/material';
import axios from 'axios'

import Iconify from '../components/iconify';
          
          // mocks_
import account from '../_mock/account';
       
export default function AdminProfile(){
           
    const[accountt,setAccount]=useState({
   "name":window.sessionStorage.name,
   "email":window.sessionStorage.email,
    "mobile":window.sessionStorage.mobile            });
          const[tempaccount,setTempaccount]=useState(accountt);

          const handleEditSubmit=(event)=>{
            event.preventDefault();
            if(window.confirm("Are you sure you want to update this record ? ")){
              axios.put(`http://localhost:8081/admins/update/${window.sessionStorage.id}`,tempaccount).then((response)=>{
              setAccount(tempaccount);
            
              });
              axios.put(`http://localhost:8081/update/${window.sessionStorage.userid}`,{email:tempaccount.email})
              window.sessionStorage.setItem("name",tempaccount.name);
              window.sessionStorage.setItem("email",tempaccount.email);
              window.sessionStorage.setItem("mobile",tempaccount.mobile);
              window.location.reload();
        
            }
          }
           
              return(
                
              <div style={{width:550}}>
              <fieldset >
               <div style={{float:'right'}}>
                <IconButton type="close" onClick={event => {window.location.href='/login/admindashboard/doctormanagement'}}><Iconify icon='eva:close-fill' /></IconButton></div><br/>
              <h2>Your Profile</h2><br />
              <Divider />

              <TextField
                id="outlined-required"
                label="Name :"
                value={tempaccount.name}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,name:e.target.value});
                }}
               /><br /><br/>
               <TextField
                id="outlined-required"
                label="Email ID: :"
                value={tempaccount.email}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,email:e.target.value});
                }}
               /><br/><br/>
               <TextField
                id="outlined-required"
                label="Contact Number :"
                value={tempaccount.mobile}
                onChange={(e)=>{
                  setTempaccount({...tempaccount,mobile:e.target.value});
                }}
               /><br/><br/>

                <div style={{float:"right"}}>
                <Button onClick={handleEditSubmit}>Save</Button>  <Button onClick={(e)=>{setTempaccount({...accountt})}}>Cancel</Button>
                </div>


              
            
          
              </fieldset>
            </div>
            );
          }