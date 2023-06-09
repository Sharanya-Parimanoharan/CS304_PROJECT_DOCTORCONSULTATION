import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Paper } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import { LoginForm } from '../sections/auth/login';
import Nav from  './Nav';
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
        <title> Login  </title>
      </Helmet>
      <StyledRoot >
      <Nav />

        {mdUp && (
          <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
            
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }} style={{fontFamily:"monospace"}}>
              Welcome To MedWeb
              </Typography> */}
           
            <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm"  >
          <StyledContent>
            <Typography variant="h4" style={{color:"blue",frontWeight:500}} gutterBottom>
              Sign in to MedWeb
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
             <button  style={{border: 'none'}} onClick={event => {window.location.href='/UserProfile'}}> <u>Get started</u></button>
            </Typography>

            <Paper elevation={3} >

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
            </Paper>
          </StyledContent>
        </Container>
        
      </StyledRoot>
    </>
  );
}
