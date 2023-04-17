import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState ,useEffect} from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableHead,
  alpha,
  styled,
  InputBase,
  Box,
  Popover,
  Checkbox,
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

import Popupforms from './Popupform';
import PopupAddSched from './PopupAddSched';
import DeleteConfirm from './DeleteConfirm';

import Iconify from '../components/iconify';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListhead, UserListToolBar ,FilterSideBar } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';

import ReadOnlyRowSched from './ReadOnlyRowSched';
import EditableRowSched from './EditableRowSchedule';
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

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[openPopup , setOpenPopup]=useState(false);
  const[openPopupp , setOpenPopupp]=useState(false);

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
  const [schedData, setSchedData] = useState([]);
  const [scheddata, setScheddata] = useState([]);
  const[sch,setSch]=useState(0);

  const [search,setSearch]=useState("");


   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;

   const[editId,setEditId]=useState(null);
   const[editFormData,setEditFormData]=useState({
     name:"",
     email:"",
     date:"",
     stime:"",
     etime:"",
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
    axios.get('http://localhost:8081/doctors').then((response)=>{
        setScheddata(response.data);
    });
  },[]);

  const deleteSched=(id)=>{
  //   if(window.confirm("Are you sure you want to delete this ? ")){
  //   axios.delete(`http://localhost:8081/schedules/${id}`).then((response)=>{
  //     axios.get('http://localhost:8081/doctors').then((response)=>{
  //       setScheddata(null);
  //     setScheddata(response.data);
  //   });
  //   });  
  //  }
  setOpenPopupp(true);
  setSch(id);
 }

 const handleEditSubmit=(event,id)=>{
  event.preventDefault();
  if(window.confirm("Are you sure you want to update this record ? ")){
    axios.put(`http://localhost:8081/schedules/update/${id}`,editFormData).then((response)=>{
     setScheddata(response.data);
     setEditId(null);
     window.location.reload();
    });  }
}
  const handleEditClick=(event,val,sch)=>{
    event.preventDefault();
    setEditId(sch.id);
    setEditFormData(sch)

  }
  const handleCancelClick=()=>{
    setEditId(null);
  }
  
   const addRows = (data) => {
    const totalStudents = schedData.length;
   // data.id = totalStudents + 1;
    const updatedSchedData = [...schedData];
    updatedSchedData.push(data);
    setSchedData(updatedSchedData);
  };

  const deleteTableRows = (index)=>{
    const rows = [...schedData];
    rows.splice(index, 1);
    setSchedData(rows);
}
  return (
    <>
      <Helmet>
        <title> Schedule Management </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="c enter" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Schedule Management
          </Typography>
           <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>setOpenPopup(true)}>
            New 
          </Button> 
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
                  <TableCell style={{backgroundColor:"lightblue"}}>Date</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Start Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>End Time</TableCell>
                 <TableCell style={{backgroundColor:"lightblue"}}>Contact</TableCell>
                 <TableCell style={{backgroundColor:"lightblue"}}>Home Visit</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Action</TableCell>
                  {/* <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell> */}
                </TableHead>
                <TableBody>
                  

              {scheddata.filter((val)=>{
                        if(search===""){
                           return val
                         }
                        if(val.doctor_name.toLowerCase().includes(search.toLowerCase())){
                           return val
                        }
                        return null
    
                        }).map((val,index) => {
                         
                     if(val.schedule==null){return null}
                      return (
                        val.schedule.map((sch,index) =>{
                          return(
                    <TableRow>
      <>
        { editId===sch.id ?<EditableRowSched editFormData={editFormData} id={sch.id} val={val}
        handleEditFormChane={handleEditFormChane} handleCancelClick={handleCancelClick} handleEditSubmit={handleEditSubmit} /> :  
        <ReadOnlyRowSched val={val} sch={sch} handleEditClick={handleEditClick} deleteSched={deleteSched}/>}
        
       </>
      
                    
                    </TableRow> );
                      }) );
                      })}

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
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <PopupAddSched func={addRows} />
      </Popupforms>

      <Popupforms
        openPopup={openPopupp}
        setOpenPopup={setOpenPopupp}>
          <DeleteConfirm id={sch}/>
      </Popupforms>
    </>
  );
}
