import { React,useState ,useReducer} from 'react';
import md5 from 'md5-hash';


// @mui
import { styled } from '@mui/material/styles';
import {  TextField,IconButton,Button, InputAdornment} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios';

import Iconify from '../components/iconify';


const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
 }   
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
export default function ResetPassword({id}){
  

    
    const [pass, setPass] = useState('');
    const [newpass, setNewPass] = useState('');
    const [cnewpass, setCNewPass] = useState('');
    const [email,setEmail]=useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError]=useState('');
    const [close,setClose]=useState(true);
    const handle=(e)=>{
        e.preventDefault();
        if(newpass!==cnewpass){
          setError('New Password and Re-enter new Password are not same');
        }}

        const changeEmail=(event)=>{
          setEmail(email);
        }

    const changePass = (event) => {
      setPass(event.target.value);
    };
    
    const changeNewPass = (event) => {
      setNewPass(event.target.value);
    };
    const changeCNewPass = (event) => {
        setCNewPass(event.target.value);
      };

    const save=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8081/useremail",{
        email
        }).then((response)=>{
          const id =response.data.p_id;
          const id2=response.data.d_id;
          if(id2===0){
            const hash=md5(newpass)
            axios.put(`http://localhost:8081/patients/update/${id}`,{
            password:hash
          }).then((response)=>{
              window.location.reload();
          });  }
           })
      }
    
    // const clearState = () => {
    //   setEmail('');
    //   setName('');
    //   setContact('');
     
    // };
    
    // const transferValue = (event) => {
    //   event.preventDefault();
    //   const val = {
    //     email,
    //     name,
    //     contact,
    //   };
    //   props.func(val);
     // clearState();
    // };

    // const handleSubmit=(event)=>{
    //   event.preventDefault();
    //   const newData={
    //     email:addFormData.email,
    //     name:addFormData.name,
    //     contact:addFormData.contact,
    //   };
    // }
    
   
    
      // const handleChange = (newValue) => {
      //   setValue(newValue);
      // };



      

      // const handleSubmit = event => {
      //   event.preventDefault();
      //   setSubmitting(true);
    
      //   setTimeout(() => {
      //     setSubmitting(false);
      //   }, 3000)
      // } 
 
    return(
        <>
            <div className="wrapper">
   
      <form onSubmit={save}>
        <fieldset>
       
          <div style={{float:'right'}}>
          <IconButton type="reset"   onClick={()=>{window.location.reload(false)}}><CloseIcon /></IconButton></div>
          <h4>Reset Password</h4>
          <divider />

          {/* <Iconify icon='eva:close-fill' /> */}
           
            <TextField name="email" label="Email" value={email} type="email" onChange={changeEmail} /><br/>
           <TextField name="password"  label="Old Password"  value={pass} onChange={changePass}
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
           type={showPassword ? 'text' : 'password'}
           InputProps={{
             endAdornment: (
               <InputAdornment position="end">
                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                 </IconButton>
               </InputAdornment>),}}/>
           <br />           <br />


           <TextField name="pass"  label="New Password" value={newpass} onChange={changeNewPass} 
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            type={showPassword ? 'text' : 'password'}
           InputProps={{
             endAdornment: (
               <InputAdornment position="end">
                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                 </IconButton>
               </InputAdornment>),}}/>
           <br />           <br />



           <TextField name="paa"  label="Re-enter New Password" value={cnewpass} onChange={changeCNewPass}
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
           type={showPassword ? 'text' : 'password'}
           InputProps={{
             endAdornment: (
               <InputAdornment position="end">
                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                 </IconButton>
               </InputAdornment>),}}/>   <br />
               <p style={{color:'red',fontWeight:500,fontSize:14}}>{error}</p><br/>

        </fieldset>
       
       <div >
        <Button type="submit" >Save</Button>
        
        </div>
      </form>
    </div>
      </>

    );
}