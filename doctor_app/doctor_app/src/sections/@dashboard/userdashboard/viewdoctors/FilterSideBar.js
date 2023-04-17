import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserPage from '../../../../pages/UserPage';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

// ----------------------------------------------------------------------

 const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
 const FILTER_SPECIALITY_OPTIONS = ['Neurologist', 'Cardiologist', 'General Physician','Dermatologist','Surgen'];
 const FILTER_EDUCATION_OPTIONS = ['MBBS', 'MBBS MD', 'MBBS MS'];


// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};




export default function ShopFilterSidebar({docData, openFilter, onOpenFilter, onCloseFilter ,setfilteredData}) {
  const [spec,setYear]=useState("All");
  const [filter,setFilterData]=useState(docData);
  const navigate=useNavigate();

  const handle=(e)=>{
    e.preventDefault();
    if(window.location.pathname==="/login/userdashboard/doctor"){
      if(spec==="All"){
        axios.get('http://localhost:8081/doctors').then((response)=>{
          setFilterData(response.data);
          window.location.reload();
          navigate("/login/userdashboard/doctor",{state:{data:response.data}})
      })}
      else{
        axios.get(`http://localhost:8081/doctors/speciality/${spec}`).then((response)=>{
        setFilterData(response.data);
        window.location.reload();
        navigate("/login/userdashboard/doctor",{state:{data:response.data}})
      });}
    }
    if(window.location.pathname==="/login/admindashboard/doctormanagement"){
      if(spec==="All"){
        axios.get('http://localhost:8081/doctors').then((response)=>{
          setFilterData(response.data);
          window.location.reload();
          navigate("/login/admindashboard/doctormanagement",{state:{data:response.data}})
      })}
      else{
        axios.get(`http://localhost:8081/doctors/speciality/${spec}`).then((response)=>{
        setFilterData(response.data);
        window.location.reload();
        navigate("/login/admindashboard/doctormanagement",{state:{data:response.data}})
      });}
    }
          console.log(filter);
       
  }
      
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Speciality
              </Typography>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={spec}
              >
              {/* <FormGroup> */}
                {/* {FILTER_SPECIALITY_OPTIONS.map((item) => ( */}
                  <FormControlLabel  control={<Radio />} label="All" value="All"  onChange={(e)=>setYear(e.target.value)} />
                  <FormControlLabel  control={<Radio />} label="Dermatologist" value="Dermatologist" onChange={(e)=>{setYear(e.target.value)}}  />
                  <FormControlLabel  control={<Radio />} label="Surgeon" value="Surgeon" onChange={(e)=>setYear(e.target.value)} />
                  <FormControlLabel  control={<Radio />} label="Cardiologist" value="Cardiologist" onChange={(e)=>setYear(e.target.value)} />
                  <FormControlLabel  control={<Radio />} label="Neurologist" value="Neurologist" onChange={(e)=>setYear(e.target.value)} />
                  <FormControlLabel  control={<Radio />} label="General Physician" value="General Physician" onChange={(e)=>setYear(e.target.value)} />

                 {/* ))} */}
              {/* </FormGroup> */}
              </RadioGroup>
            </div>

            <div>
              {/* <Typography variant="subtitle1" gutterBottom>
                Education
              </Typography>
              <RadioGroup>
                {FILTER_EDUCATION_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup> */}
            </div>

      
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            // type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handle}
          >
            Filter All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}