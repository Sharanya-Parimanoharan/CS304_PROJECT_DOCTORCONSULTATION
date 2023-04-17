import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState ,useEffect } from 'react';
import ReactDeleteRow from 'react-delete-row';
import axios from 'axios';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  TableHead,
  style,
  InputBase,
  Box,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  styled,
  alpha,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';
import DeleteAppointPat from './DeleteAppointPat';
import Popupforms from './Popupform';


import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListhead, UserListToolBar ,FilterSideBar } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
{id: 'App.No' , label:'Appointment No', alignRight: false},
 // { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Doctor Name', label: 'Doctor Name', alignRight: false },
  { id: 'Doctor Speciality', label: 'Doctor Speciality', alignRight: false },
  {id:"Date", label:"Date", alignRight: false},
  {id:"Time",label:"Time",alignmentRight: false},
  { id: 'Book', label: 'Delete', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
];

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

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [appointtData,setAppointtData]=useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8081/appointments/${window.sessionStorage.id}`).then((response)=>{
        setAppointtData(response.data);
    });
  },[]);

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

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  
  const[sch,setSch]=useState(0);
  const[openPopupp , setOpenPopupp]=useState(false);
  const[val,setVal]=useState({});


  const [search,setSearch]=useState("");

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;
    let visit="YES";


const deleteAppoint=(id,val)=>{
//   if(window.confirm("Are you sure you want to delete it ?")){
//   axios.delete(`http://localhost:8081/appointments/${id}`);
// }
 // window.location.reload();
 setOpenPopupp(true);
 setSch(id);
 setVal(val)
}
  return (
    <>
      <Helmet>
        <title> Appointments  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Your  Appointments
          </Typography>
      
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
     
         
          <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
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
                  {/* <TableCell style={{backgroundColor:"lightblue"}}>Appointment Number</TableCell> */}
                  <TableCell style={{backgroundColor:"lightblue"}}>Doctor Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Speciality</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Date</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Home Visit</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Action</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell>
                </TableHead>
                
                <TableBody>
                {appointtData.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.docname.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val,index) => {
                          if(val.schedule.homevisit===false){visit="NO"}
                          else {visit="YES"}
                          return (
      <TableRow>
      
      {/* <TableCell align='left'>{val.appno}</TableCell> */}
      <TableCell align='left'>{val.doctor.doctor_name}</TableCell>
      <TableCell align='left'>{val.doctor.doctor_speciality}</TableCell>
      <TableCell align='left'>{val.date}</TableCell>
      <TableCell align='left'>{val.time}</TableCell>
      <TableCell align='left'>{visit}</TableCell>
      <TableCell align="left">
        <IconButton size="large" color="inherit" onClick={()=>{deleteAppoint(val.id,val)}} style={{color:"red"}} >
                <Iconify icon={'charm:circle-cross'} />
        </IconButton>
        {/* <IconButton size="large" color="inherit" >
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} />
        </IconButton>  */}
      </TableCell> 
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

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
      <Popupforms
        openPopup={openPopupp}
        setOpenPopup={setOpenPopupp}>
          <DeleteAppointPat id={sch} val={val} />
      </Popupforms>
      
    </>
  );
}