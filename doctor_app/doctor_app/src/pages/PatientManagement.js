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
  Box,
  styled,
  alpha,
  InputBase,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';
import PatientDelete from './PatientDelete';

import Popupforms from './Popupform';
import PopupAddUser from './PopupAddUser';
import Scrollbar from '../components/scrollbar';
// mock
import USERLIST from '../_mock/user';
import ReadOnlyRowPatient from './ReadOnlyRowPatient';
import EditableRowPatient from './EditableRowPatient';



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

  const[openPopup , setOpenPopup]=useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

 
  const [openFilter, setOpenFilter] = useState(false);

  const [search,setSearch]=useState("");

  const [studentData, setStudentData] = useState([]);
  const[editId,setEditId]=useState(null);
  const[editFormData,setEditFormData]=useState({
    name:"",
    email:"",
    mobile:"",
  });
 
  const handleEditFormChane=(event)=>{
    event.preventDefault();
    const fieldName=event.target.getAttribute("name");
    const fieldValue=event.target.value;

    const newData={...editFormData};
    newData[fieldName]=fieldValue;
    setEditFormData(newData);
  }

  useEffect(()=>{
    axios.get('http://localhost:8081/patients').then((response)=>{
        setStudentData(response.data);
    });
  },[]);

  const deletePatient=(id)=>{
     //  if(window.confirm("Are you sure you want to delete this record ? ")){
    //   axios.get(`http://localhost:8081/patient/${id}`).then((response)=>{
    //     axios.delete(`http://localhost:8081/patients/${response.data.users.userid}`)
    //   })
    // axios.delete(`http://localhost:8081/patients/${id}`).then((response)=>{
    //  setStudentData(null);
    //  setStudentData(response.data);
    // });   }}
    setOpenPopupp(true);
  setSch(id);
  }
 

 const handleEditSubmit=(event,id)=>{
  event.preventDefault();
  if(window.confirm("Are you sure you want to update this record ? ")){
    axios.put(`http://localhost:8081/patients/update/${id}`,editFormData).then((response)=>{
     setStudentData(response.data);
     setEditId(null);
     window.location.reload();
    });  }
}

const handleEditClick=(event,val)=>{
  event.preventDefault();
  setEditId(val.patientId);
  setEditFormData(val)
}
const handleCancelClick=()=>{
  setEditId(null);
}



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentData.length) : 0;

   const filteredUsers = applySortFilter(studentData, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;

   const[sch,setSch]=useState(0);
   const[openPopupp , setOpenPopupp]=useState(false);

  
  



  const addRows = (data) => {
    const totalStudents = studentData.length;
   // data.id = totalStudents + 1;
    const updatedStudentData = [...studentData];
    updatedStudentData.push(data);
    setStudentData(updatedStudentData);
  };

  const deleteTableRows = (index)=>{
    const rows = [...studentData];
    rows.splice(index, 1);
    setStudentData(rows);
}
const handleChange = (index, evnt)=>{
    
  const { name, value } = evnt.target;
  const rowsInput = [...studentData];
  rowsInput[index][name] = value;
  setStudentData(rowsInput)
}

  return (
    <>
      <Helmet>
        <title> User Management </title>
      </Helmet>
      
  

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User Management
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
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
               
                <TableHead >
                  <TableCell style={{backgroundColor:"lightblue"}}>Email</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Contact</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Action</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell>
                </TableHead>
                <TableBody>
                     {studentData.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.name.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val,index) => {
                          return (
      <TableRow>
     <>
        { editId===val.patientId ?<EditableRowPatient editFormData={editFormData} 
        handleEditFormChane={handleEditFormChane} handleCancelClick={handleCancelClick} handleEditSubmit={handleEditSubmit}/> :  
        <ReadOnlyRowPatient val={val} handleEditClick={handleEditClick} deletePatient={deletePatient}/>}
        
       </>
      
    </TableRow> 
      );})}
                      
                
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

         
        </Card>
      </Container>

     

      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <PopupAddUser func={addRows}/>
      </Popupforms>

      <Popupforms
        openPopup={openPopupp}
        setOpenPopup={setOpenPopupp}>
          <PatientDelete id={sch}/>
      </Popupforms>
    </>
  );
}
