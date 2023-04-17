import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function Popupforms(props){
  const{title,children,openPopup,setOpenPopup}=props;

  return(
    <Dialog open={openPopup} >
      
      <DialogContent dividers style={{backgroundImage:"url(../background/doctor.jpg)"}}>
      {children}
      </DialogContent>
    </Dialog>
  )
}