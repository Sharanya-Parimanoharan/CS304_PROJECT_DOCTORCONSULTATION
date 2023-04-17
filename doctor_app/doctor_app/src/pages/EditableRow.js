import React from 'react'
import { TableCell, TextField ,IconButton} from '@mui/material'
import Iconify from '../components/iconify'

export default function EditableRow({editFormData,handleEditFormChane,handleCancelClick,handleEditSubmit}) {
  return (
    <>
      <TableCell>
        <TextField disabled required size="small" type="email" name="doctor_email" value={editFormData.doctor_email} onChange={handleEditFormChane} />
      </TableCell>
      <TableCell>
      <TextField required size="small" type="text" name="doctor_name" value={editFormData.doctor_name} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="text" name="doctor_speciality" value={editFormData.doctor_speciality} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="number" name="doctor_mobile" value={editFormData.doctor_mobile} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="text" name="doctor_qualification" value={editFormData.doctor_qualification} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell >
        <IconButton size="large" color="inherit" onClick={handleCancelClick}  >  
                <Iconify icon={'mdi:cancel-octagon'} style={{color:"red"} }/>
        </IconButton>
      <IconButton size="large"  color="inherit" onClick={(event)=>{handleEditSubmit(event,editFormData.doctorId)}}>
                 <Iconify icon={'ic:baseline-save-alt'} style={{color:"green"}}  />
        </IconButton> 
      </TableCell>
    </>
  )
}
