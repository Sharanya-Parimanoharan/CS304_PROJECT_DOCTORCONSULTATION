import { React,useState ,useReducer} from 'react';
// @mui

import { styled } from '@mui/material/styles';
import {  TextField,IconButton,Button} from '@mui/material';

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
export default function PopupAddUser(props){
   //  const [showPassword, setShowPassword] = useState(false);
   // const [value, setValue] = useState(null);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

 


    const[addFormData,setAddFormData]=useState({
      email:'',
      name:'',
      contact:''
    });
    const changeName = (event) => {
      setName(event.target.value);
    };
    
    const changeContact = (event) => {
      setContact(event.target.value);
    };
    const changeEmail = (event) => {
      setEmail(event.target.value);
    };
    const clearState = () => {
      setEmail('');
      setName('');
      setContact('');
     
    };
    
    const transferValue = (event) => {
      event.preventDefault();
      const val = {
        email,
        name,
        contact,
      };
      props.func(val);
     // clearState();
    };

    const handleSubmit=(event)=>{
      event.preventDefault();
      const newData={
        email:addFormData.email,
        name:addFormData.name,
        contact:addFormData.contact,
      };
    }
    
   
    
      // const handleChange = (newValue) => {
      //   setValue(newValue);
      // };



      const [formData, setFormData] = useReducer(formReducer, {});
      const [submitting, setSubmitting] = useState(false);
    
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
      {/* {submitting &&
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>: {value.toString()}</li>
            ))}
          </ul>
          {}
          <button type='submit'>Ok</button>
        </div>
      } */}
      <form >
        <fieldset>
       
          <div style={{float:'right'}}>
          <IconButton type="close" ><Iconify icon='eva:close-fill' /></IconButton></div>
          <h4>Add User</h4>
          <divider />
           

           <TextField name="email"  label="User Email" type="email" value={email} onChange={changeEmail}/>
           <br />           <br />
           <TextField name="name" type='text' label="User Name" value={name} onChange={changeName} />
           <br />           <br />
           <TextField name="contact" type='number' label="Contact Number" value={contact} onChange={changeContact}/>   <br />
        </fieldset>
       
       <div >
        <Button onClick={transferValue}  >Add</Button>
        
        </div>
      </form>
    </div>
      </>

    );
}