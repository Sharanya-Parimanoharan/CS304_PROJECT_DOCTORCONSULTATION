import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState ,useEffect} from 'react';
import axios from 'axios';
// @mui
import {
  divider,
  styled,
  InputBase,
  Box,
  TableHead,
  Card,
  Table,
  Stack,
  Paper,
  Button,
  alpha,
  TableRow,
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
import Booking from './Booking';
import AppointmentBookPopup from './AppointmetBookPopup';
import Popupforms from './Popupform';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListhead, UserListToolBar ,FilterSideBar } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
 
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Doctor Name', label: 'Doctor Name', alignRight: false },
  { id: 'Doctor Speciality', label: 'Doctor Speciality', alignRight: false },
  { id: 'Education', label: 'Education', alignRight: false },
  {id:"Date", label:"Date", alignRight: false},
  {id:"Time",label:"Time",alignmentRight: false},
  { id: 'Book', label: 'Book', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
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

  const[openPopup , setOpenPopup]=useState(false);

  const[openPopupBook,setOpenPopupBook]=useState(false);

  const [appointment,setAppointment] =useState([]);
  const [time,setTime]=useState('');
  const[id1,setId1]=useState(0);
  const[val,setVal]=useState({});
  const[sch,setSch]=useState({});

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
  const [book,setBook]=useState([]);
  const [id,setId]= useState(0);
  let visit='YES';

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  useEffect(()=>{
    axios.get('http://localhost:8081/doctors').then((response)=>{
        setAppointment(response.data);
    });
  },[]);

  const bookk=(sch,id,id1,val)=>{
   // if(window.confirm("Are you sure you want to book? ")){
    //   if(sch.homevisit===false){
    //     axios.post(`http://localhost:8081/booking/${id}/${id1}`, val).then((response)=>{
    //     console.log(response.data);
    //     if(response.data.schedule!=null)
    //     {axios.post('http://localhost:8081/sendConfirmation',response.data);}
    //     else{
    //       setOpenPopupBook(true);        }
      
    //    })}
    //   else{
    //   setOpenPopup(true);
    //   setBook(val)
    //   setId(id);
    // }

   // }
   setId(id);
   setId1(id1);
   setVal(val);
   setSch(sch);
   setOpenPopupBook(true);
  }

  

  // const handleClick=(val1,val2)=>{
  //  const v1=parseInt(val1,10);
  //  const v2=parseInt(val2,10)
  //   setTime(v1-v2);
  //  // setOpenPopup(true);
  // }


  const [search,setSearch]=useState("");

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Book an Appointment </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Book an Appointment
          </Typography>
         
        </Stack>
       

        <Card>
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
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
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <FilterSideBar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            </Stack>
            </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <TableHead >
                  <TableCell style={{backgroundColor:"lightblue"}}>Email</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Doctor Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Speciality</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Date</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Home Visit</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Book</TableCell>

                  <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell>
                </TableHead>
                <TableBody>
                {appointment.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.doctor_name.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val,index) => {
                          return (
                            val.schedule.map((sch,index)=>{
                            if(sch.homevisit===false) {visit='NO'} 
                            else{visit='YES'}
                              return(
               <TableRow>
      
      <TableCell align='left'>{val.doctor_email}</TableCell>
      <TableCell align='left'>{val.doctor_name}</TableCell>
      <TableCell align='left'>{val.doctor_speciality}</TableCell>
      <TableCell align='left'>{sch.date}</TableCell>
      <TableCell align='left'>{sch.stime}</TableCell>
      <TableCell align='left'>{visit}</TableCell>
          <TableCell align="left">   
           {/* setOpenPopup(true) */}
               <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>{bookk(sch,sch.id,window.sessionStorage.id,val)}}>
                  Book
             </Button>
        </TableCell>
    </TableRow>   )
                            })
      );})}
                      

                        
                     
                      
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
        openPopup={openPopupBook}
        setOpenPopup={setOpenPopupBook}>
          < Booking  id={id} id1={id1} sch={sch} val={val}/>
      </Popupforms>
      
      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          < AppointmentBookPopup  val={book} id={id}/>
      </Popupforms>
     
    </>
  );
}
