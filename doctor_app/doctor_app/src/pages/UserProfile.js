import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme ,styled } from '@mui/material/styles';
import { Grid, Container, Typography  ,Divider} from '@mui/material';
import useResponsive from '../hooks/useResponsive';

import Nav from './Nav';
import {
   
  AppWidgetSummary,
  
} from '../sections/@dashboard/app';


// components



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


export default function DashboardAppPage() {
  const mdUp = useResponsive('up', 'md');

    const theme = useTheme();
    
    return (
      <>
        <Helmet>
          <title> UserProfile </title>
        </Helmet>
        <StyledRoot>
        <Nav />

{mdUp && (
  <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
    
    {/* <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 5 }} style={{fontFamily:"monospace"}}>
      Welcome To MedWeb
      </Typography> */}
   
    <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
  </StyledSection>
)}
  
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 2 ,mt:15}} color="darkblue" />
          
          <Typography variant="h4" sx={{ mb: 7 }} >
            Choose Your Profile Here !
          </Typography>
          <Divider />

        <Grid container spacing={5} direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
             
            <Grid item xs={12} sm={6} md={5}>
                <a href="/Registration"><AppWidgetSummary title="User" color='info' icon={"mdi:people-group"}  /></a>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <a href="/DoctorRegistration">  <AppWidgetSummary title="Doctor" color="info" icon={"mdi:people-group"} /></a>
            </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <a href="/Registration"><AppWidgetSummary title="Admin" color="info" icon={"mdi:people-group"} /></a>
          </Grid> */}
          
        </Grid>
    </Container>
    </StyledRoot>
    </>
    );
}