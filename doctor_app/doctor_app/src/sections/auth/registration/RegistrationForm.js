import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5-hash';

// @mui
import {  Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';

import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[mobile,setMobile]=useState('');
  const[pass,setPass]=useState('');
  const[error,setError]=useState('');
  const[cpass,setCPass]=useState('');
  const[perr,setPasswordErr]=useState('');
   

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

const regPatient=(e)=>{
 const hash=md5(pass);
  e.preventDefault();
  if(pass!==cpass){
    setError('Password and Confirm Password are not same');
  }else{
  axios.post('http://localhost:8081/patient',{
  name,
  email,
  mobile,
  password:hash,
  users:{
    id:3,
    email,
    password:hash
  }
}).then(res=>console.log("Patient added",res)).catch(err=>console.log(err))
  alert(" Successfully Registered");
// window.location.reload();
  navigate("/login");}
}

  

  return (
    <>
    <form onSubmit={regPatient}>
      <Stack spacing={3}>
        <TextField name="name" label="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <TextField name="email" label="Email address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <TextField name="mobile" label="Mobile Number" type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} required />
        <TextField
          name="password"
          label="Password"
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

        <TextField
          name="password"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={cpass} onChange={(e)=>setCPass(e.target.value)}
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

      

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Register
      </LoadingButton>
      </Stack>
    </form>
    </>
  );
}