import React from 'react'
import { TableCell, TextField ,IconButton} from '@mui/material'
import Iconify from '../components/iconify'

export default function EditableRowPatient({editFormData,handleEditFormChane,handleCancelClick,handleEditSubmit}) {
  return (
    <>
      <TableCell>
        <TextField disabled required size="small" type="email" name="email" value={editFormData.email} onChange={handleEditFormChane} />
      </TableCell>
      <TableCell>
      <TextField required size="small" type="text" name="name" value={editFormData.name} onChange={handleEditFormChane}/>
      </TableCell>
     
      <TableCell>
      <TextField size="small" required type="number" name="mobile" value={editFormData.mobile} onChange={handleEditFormChane}/>
      </TableCell>

      <TableCell >
        <IconButton size="large" color="inherit" onClick={handleCancelClick}  >  
                <Iconify icon={'mdi:cancel-octagon'} style={{color:"red"} }/>
        </IconButton>
      <IconButton size="large"  color="inherit" onClick={(event)=>{handleEditSubmit(event,editFormData.patientId)}}>
                 <Iconify icon={'ic:baseline-save-alt'} style={{color:"green"}}  />
        </IconButton> 
      </TableCell>
    </>
  )
}