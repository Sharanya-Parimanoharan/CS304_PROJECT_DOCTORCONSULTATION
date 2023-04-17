import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Paper ,Divider } from '@mui/material';


// hooks
import useResponsive from '../hooks/useResponsive';
import { DoctorRegistrationForm } from '../sections/auth/registration';
// components
import Nav from './Nav';
import Iconify from '../components/iconify';
// sections

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

  return (
    <>
      <Helmet>
        <title> Register  </title>
      </Helmet>

      <StyledRoot>
        <Nav />
      
        {mdUp && (
         
          <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
             {/* <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 2}}>
          Enter Your Details Here!
     </Typography> */}
            <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" style={{color:'blue',fontWeight:500}}  gutterBottom>
              Sign up to MedWeb
            </Typography><Divider /><br/>
            <Paper elevation={3} >
            <DoctorRegistrationForm />
            </Paper>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
