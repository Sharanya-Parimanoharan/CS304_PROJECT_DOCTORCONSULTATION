import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState ,useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  InputBase,
  Button,
  Box,
  styled,
  alpha,
  Popover,
  TableHead,
  TableRow,
  MenuItem,
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
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import CancelBooking from './CancelBooking';
import Popupforms from './Popupform';

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

  const[openPopup,setOpenPopup]=useState(false);

  const[val,setVal]=useState({});
  const[id,setId]=useState(0);

  let visit='YES';

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 
  const [appointData, setAppointData] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8081/appointments/doctor/${window.sessionStorage.id}`).then((response)=>{
        setAppointData(response.data);
    });
  },[]);

 
  const handle=(id,val)=>{
    setVal(val);
    setId(id);
    setOpenPopup(true);
  }

  const [search,setSearch]=useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
       <Helmet>
        <title> Appointments  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
              Appointments
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
                  {/* <TableCell style={{backgroundColor:"lightblue"}}>Appointment No</TableCell> */}
                  <TableCell style={{backgroundColor:"lightblue"}}>Email</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Patient Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Date</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Home Visit</TableCell>

                  <TableCell style={{backgroundColor:"lightblue"}}>Action</TableCell>

                  <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell>
                </TableHead>

                <TableBody>
                 
                     {appointData.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.patient.name.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val,index) => {
                          if(val.schedule.homevisit===true){visit="YES"}
                          else{visit='NO'}
                          return (
      <TableRow>
      
      {/* <TableCell align='left'>{val.appno}</TableCell> */}
      <TableCell align='left'>{val.patient.email}</TableCell>
      <TableCell align='left'>{val.patient.name}</TableCell>
      <TableCell align='left'>{val.date}</TableCell>
      <TableCell align='left'>{val.time}</TableCell>
      <TableCell align='left'>{visit}</TableCell>
      <TableCell align="left">
        <IconButton size="large" color="inherit" onClick={()=>(handle(val.id,val))} style={{color:"red"}}>
                <Iconify icon={'charm:circle-cross'} />
        </IconButton>
        {/* <IconButton size="large" color="inherit" >
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} /> deleteAppoint(val.id,val)
        </IconButton>  */}
      </TableCell> 
    </TableRow> 
      );})}
                </TableBody>
{/* 
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
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

    
        </Card>
      </Container>

      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <CancelBooking val={val} id={id} />
      </Popupforms>
      
    </>
  );
}