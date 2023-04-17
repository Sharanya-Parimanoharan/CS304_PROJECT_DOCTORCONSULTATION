import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState ,useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  styled,
  Box,
  alpha,
  TableHead,
  InputBase,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';


import Scrollbar from '../components/scrollbar';
// sections
import { UserListhead, UserListToolBar ,FilterSideBar } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------



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



export default function UserPage({data}) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location=useLocation();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const [docData, setDocData] = useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
    console.log(location?.state?.data);

    if(location?.state?.data==null){
    axios.get('http://localhost:8081/doctors').then((response)=>{
       setDocData(response.data);
       navigate("/login/userdashboard/doctor")
    });}
    else{ 
        setDocData(location?.state?.data);
    }
  },[]);
  
  
  const [search,setSearch]=useState("");

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  

  return (
    <>
      <Helmet>
        <title> Doctors-Available </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Available Doctors
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
            <FilterSideBar
              docData={docData}
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
                  <TableCell style={{backgroundColor:"lightblue"}}>Doctor Name</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Speciality</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Education</TableCell>
                </TableHead>
                <TableBody>
                 
                {docData.filter((val)=>{
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
      
      <TableCell align='left'>{val.doctor_email}</TableCell>
      <TableCell align='left'>{val.doctor_name}</TableCell>
      <TableCell align='left'>{val.doctor_speciality}</TableCell>
      <TableCell align='left'>{val.doctor_qualification}</TableCell>

      {/* <TableCell align="left">
        <IconButton size="large" color="inherit" onClick={()=>(deleteTableRows(index))}>
                <Iconify icon={'charm:circle-cross'} />
        </IconButton>
        <IconButton size="large" color="inherit" >
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'} />
        </IconButton> 
      </TableCell>  */}
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

      
    </>
  );
}
