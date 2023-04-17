import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import Popupforms from '../../../pages/Popupform';
import DoctorProfile from '../../../pages/DoctorProfile';
// mocks_
import account from '../../../_mock/account';
import RestPassword from '../../../pages/ResetPassword';
import DeactivateAdmin from '../../../pages/DeactivateAdmin';

// import DoctorProfile from 'src/pages/DoctorProfile';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
 
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const[openPopup , setOpenPopup]=useState(false);
  const[openPassPopup , setOpenPassPopup]=useState(false);
  const[openDeactivate , setOpenDeactivate]=useState(false);



  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const form=(PopUpForms)=>{
    setOpen(PopUpForms.CustomizedDialogs);
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {window.sessionStorage.name}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {}
          </Typography> */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>setOpenPopup(true)}>
              {option.label} 
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuItem  sx={{ m: 1 }} onClick={()=>setOpenPassPopup(true)}>
            Change Password
        </MenuItem> */}

         <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={event => {window.location.href='/login';
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("mobile");
       window.sessionStorage.removeItem("id"); window.sessionStorage.removeItem("email");
       window.sessionStorage.removeItem("speciality");
      window.sessionStorage.removeItem("education");
      window.sessionStorage.removeItem("userid");}} sx={{ m: 1 }}>
          Logout
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem  sx={{ m: 1 }} onClick={()=>setOpenDeactivate(true)}>
              Deactivate Account 
          </MenuItem> 
      </Popover>
      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <DoctorProfile />
      </Popupforms>
      <Popupforms
        openPopup={openDeactivate}
        setOpenPopup={setOpenDeactivate}>
          <DeactivateAdmin  />
      </Popupforms>
    </>
  );
}