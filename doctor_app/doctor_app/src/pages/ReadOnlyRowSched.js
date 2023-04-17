import React from 'react'
import {
    TableCell,
    IconButton,
    } from '@mui/material';
  import Iconify from '../components/iconify';

  export default function ReadOnlyRow({val,sch,deleteSched,handleEditClick}) {
    let visit="NO";
    if(sch.homevisit===true){  visit="YES";}
    else{ visit="NO"}
  return (
    <>
      <TableCell align='left'>{val.doctor_email}</TableCell>
      <TableCell align='left'>{val.doctor_name}</TableCell>
      <TableCell align="left">{sch.date}</TableCell>
      <TableCell align='left'>{sch.stime}</TableCell> 
       <TableCell align='left'>{sch.etime}</TableCell>
      <TableCell align='left'>{val.doctor_mobile}</TableCell>
      <TableCell align='left'>{visit}</TableCell>
      <TableCell align="left">
        <IconButton size="large" color="inherit" >  
                <Iconify icon={'charm:circle-cross'} color="red" onClick={()=>{deleteSched(sch.id)}} />
        </IconButton>
      <IconButton size="large" color="inherit">
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} color="brown" onClick={(event)=>{handleEditClick(event,val,sch)}} />
        </IconButton> 
      </TableCell> 
</>
  )
}
