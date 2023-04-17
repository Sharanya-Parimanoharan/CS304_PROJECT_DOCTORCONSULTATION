import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider, Paper,Stack,TextField,Alert } from '@mui/material';
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
  const navigate=useNavigate();
    const[email,setEmail]=useState("");

    const otp=(e)=>{
      // const hash=md5(pass);
      e.preventDefault();
        axios.post('http://localhost:8081/forgot',email,{
        headers: {"Content-Type":"text/html"}
      }).then(response=>{console.log(response)});
      navigate("/verify");}
    
  return (
    <>
      <Helmet>
        <title> Login  </title>
      </Helmet>
      <form onSubmit={otp} >

      <StyledRoot >

        <Nav />

        {mdUp && (
          <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
            
            {/* <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 5 }} style={{fontFamily:"monospace"}}>
              Welcome To MedWeb
              </Typography> */}
           
            <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm"  >
          <StyledContent>
            {/* <Typography variant="h4" style={{color:"blue",frontWeight:500,textAlign:'center'}} gutterBottom>
                Your Registered Email    
            </Typography> */}

            <div className="alert alert-success" role="alert" style={{fontWeight:"bold"}}>  Your Registered Email  </div>
            <Divider />
            <Paper elevation={3} >
            <Divider />

            <>
 
 <Stack spacing={3}>
   <TextField required name="email" label="Email address" id="name" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

 </Stack>
<br/>


 <LoadingButton fullWidth size="large" type="submit" variant="contained" >
   Send OTP
 </LoadingButton>
</>            </Paper>
          </StyledContent>
        </Container>

      </StyledRoot>
      </form>

    </>
  );
        }