import React from 'react'
import {
    TableCell,
    IconButton,
    } from '@mui/material';
  import Iconify from '../components/iconify';

export default function ReadOnlyRowPatient({val,deletePatient,handleEditClick}) {
  return (
    <>
      <TableCell align='left'>{val.email}</TableCell>
      <TableCell align='left'>{val.name}</TableCell>
      <TableCell align='left'>{val.mobile}</TableCell>
      <TableCell align="left">
        <IconButton size="large" color="inherit" onClick={()=>(deletePatient(val.patientId))} >
                <Iconify icon={'charm:circle-cross'} color="red" />
        </IconButton>
        {/* <IconButton size="large" color="inherit" >
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} color="brown" onClick={(event)=>{handleEditClick(event,val)}}/>
        </IconButton>  */}
      </TableCell> 
    </>
  )
}
