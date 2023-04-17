import React from 'react'
import { TableCell, TextField ,IconButton} from '@mui/material'
import Iconify from '../components/iconify'

export default function EditableRowPatient({val,editFormData,handleEditFormChane,handleCancelClick,handleEditSubmit,id}) {
  let visit="NO";
  if(editFormData.homevisit===true){  visit="YES";}
  else{ visit="NO"}

return(
<>
     <TableCell>
     <TableCell align='left'>{val.doctor_email}</TableCell>
      </TableCell>
      <TableCell>
      <TableCell align='left'>{val.doctor_name}</TableCell>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="date" name="date" value={editFormData.date} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="time" name="stime" value={editFormData.stime} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TextField size="small" required type="time" name="etime" value={editFormData.etime} onChange={handleEditFormChane}/>
      </TableCell>
      <TableCell>
      <TableCell align='left'>{val.doctor_mobile}</TableCell>
      </TableCell>
      <TableCell>
      <TableCell disabled align='left'>{visit}</TableCell>
      </TableCell>

      <TableCell >
        <IconButton size="large" color="inherit" onClick={handleCancelClick}  >  
                <Iconify icon={'mdi:cancel-octagon'} style={{color:"red"} }/>
        </IconButton>
      <IconButton size="large"  color="inherit" onClick={(event)=>{handleEditSubmit(event,id)}}>
                 <Iconify icon={'ic:baseline-save-alt'} style={{color:"green"}}  />
        </IconButton> 
      </TableCell>

</>


)
}