import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState,useEffect } from 'react';

import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Box,
  styled,
  alpha,
  InputBase,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';

import Popupforms from './Popupform';
import PopupAddDoctor from './PopupAddDoctorSched';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { FilterSideBar } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import Header from './Header';




// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[openPopup , setOpenPopup]=useState(false);


 
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [doctorData, setDoctorData] = useState([]);
  const[editId,setEditId]=useState(null);
  const[editFormData,setEditFormData]=useState({
    doctor_name:"",
    doctor_email:"",
    doctor_qualification:"",
    doctor_mobile:"",
    doctor_speciality:""
  });
  const [search,setSearch]=useState("");

  const handleEditFormChane=(event)=>{
    event.preventDefault();
    const fieldName=event.target.getAttribute("name");
    const fieldValue=event.target.value;

    const newData={...editFormData};
    newData[fieldName]=fieldValue;
    setEditFormData(newData);
  }

  useEffect(()=>{
    axios.get('http://localhost:8081/doctors').then((response)=>{
      const doc=response.data;
        setDoctorData(response.data);
    });
  },[]);

  const deleteDoc=(id)=>{
    if(window.confirm("Are you sure you want to delete this record ? ")){
     axios.delete(`http://localhost:8081/doctors/${id}`).then((response)=>{
      setDoctorData(null);
      setDoctorData(response.data);
     });  }  
  }
  
const handleEditSubmit=(event,id)=>{
  event.preventDefault();
  if(window.confirm("Are you sure you want to update this record ? ")){
    axios.put(`http://localhost:8081/doctors/update/${id}`,editFormData).then((response)=>{
     setDoctorData(response.data);
     setEditId(null);
     window.location.reload();
    });  }
}

const handleEditClick=(event,val)=>{
  event.preventDefault();
  setEditId(val.doctorId);
  setEditFormData(val)
}
const handleCancelClick=()=>{
  setEditId(null);
}

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Doctors </title>
      </Helmet>
        <Header />
        <br /><br /><br />

        <divider />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom style={{color:"darkblue",fontFamily:"unset"}}>
            View all available doctors 
          </Typography>
           
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
     
         
     <Search>
     <SearchIconWrapper>
       <SearchIcon />
     </SearchIconWrapper>
     <StyledInputBase
       placeholder="Search By Name…"
       inputProps={{ 'aria-label': 'search' }}
       onChange={(event)=>{setSearch(event.target.value)}}
     />
     </Search>
   <Box sx={{ flexGrow: 1 }} />

   </Box>
   <divider />
   <br />


        <Card>
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FilterSideBar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            </Stack>
            </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
               
                  <TableHead >
                  <TableCell style={{backgroundColor:"lightblue"}}>Email</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Doctor Speciality</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Education</TableCell>
                  <TableCell>{}</TableCell>
                </TableHead>
                <TableBody>
                {doctorData.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.doctor_name.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val) => {
                          return (
                            <TableRow>
                            <>
                                <TableCell align='left'>{val.doctor_email}</TableCell>
                                 <TableCell align='left'>{val.doctor_name}</TableCell>
                            <TableCell align='left'>{val.doctor_speciality}</TableCell>
                            <TableCell align='left'>{val.doctor_qualification}</TableCell> 
                             </>
                    </TableRow> 
                    );})}


                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

              
              </Table>
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>

    </>
  );
}
