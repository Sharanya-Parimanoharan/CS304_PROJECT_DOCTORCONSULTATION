import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5-hash';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox ,Alert ,Popover} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import Header from '../../../layouts/dashboard/header/index';
import DashboardLayout from  '../../../layouts/dashboard/DashboardLayout'
// ----------------------------------------------------------------------


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const[username,setUserName]=useState('');
  const[password,setPassword]=useState('');

  const[name,setName]=useState('');
  const[number,setNumber]=useState('');
  const [email,setEmail]=useState('');

  const handle=(event)=>{
    event.preventDefault();
    const hash=md5(password);
    axios.post("http://localhost:8081/users",{
      email:username,
      password:hash
    }).then((response)=>{    
      if(response.data.email!=null){
      const id1 =response.data.userid;
      const id=response.data.id;
      if(id===1){
        axios.get(`http://localhost:8081/admin/user/${id1}`).then((res)=>{
          // console.log(res.data.mobile);
          
          // <Header name={res.data.email} email={res.data.email}  mobile={res.data.mobile}/>
          // <DashboardLayout name={res.data.name} />
           navigate("/login/admindashboard")
  
              window.sessionStorage.setItem("name",res.data.name);
              window.sessionStorage.setItem("email",res.data.email);
              window.sessionStorage.setItem("id",res.data.id);
              window.sessionStorage.setItem("mobile",res.data.mobile);
              window.sessionStorage.setItem("userid",id1);
        }) 
          
      }
     if(id===2){
      axios.get(`http://localhost:8081/doctor/user/${id1}`).then((res)=>{
        // console.log(res.data.mobile);
        
        // <Header name={res.data.email} email={res.data.email}  mobile={res.data.mobile}/>
        // <DashboardLayout name={res.data.name} />
         navigate("/login/doctordashboard")

            window.sessionStorage.setItem("name",res.data.doctor_name);
            window.sessionStorage.setItem("email",res.data.doctor_email);
            window.sessionStorage.setItem("id",res.data.doctorId);
            window.sessionStorage.setItem("mobile",res.data.doctor_mobile);
            window.sessionStorage.setItem("speciality",res.data.doctor_speciality);
            window.sessionStorage.setItem("education",res.data.doctor_qualification);
            window.sessionStorage.setItem("userid",id1);
      })        
      }
      if(id===3){
        axios.get(`http://localhost:8081/patient/user/${id1}`).then((res)=>{
          console.log(res.data.mobile);
          setEmail(res.data.email);
          setName(res.data.name);
          setStudentData(res.data);
          // <Header name={res.data.email} email={res.data.email}  mobile={res.data.mobile}/>
          // <DashboardLayout name={res.data.name} />
           navigate("/login/userdashboard",{
            state:{
              name:res.data.name,
              email:res.data.email,
              mobile:res.data.mobile}});


              window.sessionStorage.setItem("name",res.data.name);
              window.sessionStorage.setItem("email",res.data.email);
              window.sessionStorage.setItem("id",res.data.patientId);
              window.sessionStorage.setItem("mobile",res.data.mobile);
              window.sessionStorage.setItem("userid",id1);

        })
      }}
      else{
        console.log("error");
         window.location.reload();  
      }
     } ) }
  

  

  return (
    <>
 
      <Stack spacing={3}>
        <TextField required name="email" label="Email address" id="name" type="email" value={username} onChange={(e)=>setUserName(e.target.value)}/>

        <TextField
        required
          name="password"
          label="Password"
          id="pass"
          value={password} onChange={(e)=>setPassword(e.target.value)}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" href='/forgot'>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handle} >
        Login
      </LoadingButton>
    </>
  );
}

