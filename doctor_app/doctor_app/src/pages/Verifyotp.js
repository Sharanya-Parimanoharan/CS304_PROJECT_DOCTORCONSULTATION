import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider, Paper,Stack,TextField,Alert,AlertTitle} from '@mui/material';
// hooks
// components
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
import Nav from './Nav';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
    const[otp,setOtp]=useState('');
    const navigate=useNavigate();

    const verify=(e)=>{
      e.preventDefault();
      axios.post('http://localhost:8081/verify',otp,{
        headers: {"Content-Type":"text/html"}
      }).then(response=>{
      if(response.data===true){
        navigate('/reset');
      }
      else{
        navigate('/forgot');
      }
      
      });
     // navigate("/verify");}
    }
  return (
    <>
      <Helmet>
        <title> Login  </title>
      </Helmet>
      <form onSubmit={verify}>

      <StyledRoot >
        <Nav />
        {mdUp && (
          <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
            
       
           
            <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm"  >
          <StyledContent>
            

            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
                    OTP sent ! — <strong>check it out!</strong>
                </Alert>

            <Paper elevation={3} >
            <Divider />

            <>
 
 <Stack spacing={3}>
   <TextField required name="number" label="OTP" id="name" type="number" value={otp} onChange={(e)=>setOtp(e.target.value)}/>

 </Stack>
<br/>


 <LoadingButton fullWidth size="large" type="submit" variant="contained">
   Verify OTP
 </LoadingButton>
</>            </Paper>
          </StyledContent>
        </Container>
        
      </StyledRoot>
      </form>
    </>
  );
}