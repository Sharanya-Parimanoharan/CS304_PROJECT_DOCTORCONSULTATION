import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5-hash';

import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';


import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Divider, Paper,Stack,TextField,IconButton,InputAdornment,Typography,Alert,AlertTitle} from '@mui/material';
// hooks
import Iconify from '../components/iconify';

// components
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
    const [showPassword, setShowPassword] = useState(false);
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const[error,setError]=useState('');
    const[cpass,setCPass]=useState('');
    const[perr,setPasswordErr]=useState('');
    const navigate=useNavigate();

    const check=(e)=>{
       
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp   = /.{8,}/;
            const passwordLength =      pass.length;
            const uppercasePassword =   uppercaseRegExp.test(pass);
            const lowercasePassword =   lowercaseRegExp.test(pass);
            const digitsPassword =      digitsRegExp.test(pass);
            const specialCharPassword = specialCharRegExp.test(pass);
            const minLengthPassword =   minLengthRegExp.test(pass);
            let errMsg ="";
            if(passwordLength===0){
                    errMsg="Password is empty";
            }else if(!uppercasePassword){
                    errMsg="At least one Uppercase";
            }else if(!lowercasePassword){
                    errMsg="At least one Lowercase";
            }else if(!digitsPassword){
                    errMsg="At least one digit";
            }else if(!specialCharPassword){
                    errMsg="At least one Special Characters";
            }else if(!minLengthPassword){
                    errMsg="At least minumum 8 characters";
            }else{
                errMsg="";
            }
            setPasswordErr(errMsg);
            
    }
    const set =(val)=>{
        setPass(val);
        check();
    }

    const handle=(e)=>{
        e.preventDefault();
       
    }

    const save=(e)=>{
      e.preventDefault();
      if(pass!==cpass){
        setError("Passwords does not match !");
    }
    else{
      axios.post("http://localhost:8081/useremail",{
      email
      }).then((response)=>{
       // console.log(response.data)
        const id =response.data.userid;
        const role=response.data.id;
        if(role===3){
          axios.get(`http://localhost:8081/patient/user/${id}`).then((response)=>{
            console.log(response.data);
            const pid=response.data.patientId;
            const hash=md5(pass);
            axios.put(`http://localhost:8081/patients/update/${pid}`,{
              password:hash,
            })
            axios.put(`http://localhost:8081/update/${id}`,{
              password:hash,
            })
          })
        //   const hash=md5(pass);
        //   //axios.put(`http://localhost:8081/patients/update/${id}`,{
        //   password:hash
        // }).then((response)=>{
        //     window.location.reload();
        // });  }
    }})}
  }
    
      
    
  return (
    <>
      <Helmet>
        <title> Reset  </title>
      </Helmet>
      <form onSubmit={save} >
       
      <StyledRoot >
        <Nav />
        {mdUp && (
          <StyledSection style={{ backgroundImage: 'url("assets/bg.jpg")' }}>
            <img src="/assets/illustrations/home_healthy_pic2.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm"  >
          <StyledContent>
          <Typography style={{fontSize:25,fontStyle:"oblique"}}>
            Reset Password
        </Typography><br/><br/>

          <TextField name="email" label="Email address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <br/>
        <TextField
        required
          name="password"
          label=" New Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={pass} onChange={(e)=>set(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
                <p style={{color:'red',fontWeight:500,fontSize:14}}>{perr}</p>

<br/>
<TextField
        required
          name="password"
          label="Re-enter Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={cpass} onChange={(e)=>setCPass(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p style={{color:'red',fontWeight:500,fontSize:14}}>{error}</p>

            <Paper elevation={3} >
            <Divider />

            <>
 
 {/* <Stack spacing={3}>
   <TextField required name="number" label="OTP" id="name" type="number" value={otp} onChange={(e)=>setOtp(e.target.value)}/>

 </Stack> */}
<br/>


 <LoadingButton fullWidth size="large" type="submit" variant="contained">
    Set Password
 </LoadingButton>
</>            </Paper>
          </StyledContent>
        </Container>
        
      </StyledRoot>
      </form>
    </>
  );
}