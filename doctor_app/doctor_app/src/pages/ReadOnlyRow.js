import React from 'react'
import {
    TableCell,
    IconButton,
    } from '@mui/material';
  import Iconify from '../components/iconify';

  export default function ReadOnlyRow({val,deleteDoc,handleEditClick}) {
  return (
    <>
      <TableCell align='left'>{val.doctor_email}</TableCell>
      <TableCell align='left'>{val.doctor_name}</TableCell>
      <TableCell align='left'>{val.doctor_speciality}</TableCell>
      <TableCell align='left'>{val.doctor_mobile}</TableCell>
      <TableCell align='left'>{val.doctor_qualification}</TableCell>
      <TableCell align="left">
        <IconButton size="large" color="inherit" >  
         {/* ()=>(deleteTableRows(index)) */}
                <Iconify icon={'charm:circle-cross'} color="red" onClick={()=>{deleteDoc(val.doctorId)}} />
        </IconButton>
      <IconButton size="large" color="inherit">
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} color="brown" onClick={(event)=>{handleEditClick(event,val)}} />
        </IconButton> 
      </TableCell> 
</>
  )
}
