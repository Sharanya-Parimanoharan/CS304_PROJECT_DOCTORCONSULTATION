import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import Popupforms from '../../../pages/Popupform';
// import Registration from '../../../pages/Registration';
// mocks_
import account from '../../../_mock/account';
import AdminProfile from '../../../pages/AdminProfile';
import RestPassword from '../../../pages/ResetPassword';


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

        <MenuItem onClick={event => {window.location.href='/login'}} sx={{ m: 1 }}>
          Logout
        </MenuItem>

        
      </Popover>
      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <AdminProfile />
      </Popupforms>
     
     
    </>
  );
}
