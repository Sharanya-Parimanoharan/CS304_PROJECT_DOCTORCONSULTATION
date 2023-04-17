import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState  ,useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
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
import { ContactEmergency } from '@mui/icons-material';
import Popupforms from './Popupform';
import PopupAddSchedDoctor from './PopupAddSchedDoctor';
import Iconify from '../components/iconify';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListhead, UserListToolBar  } from '../sections/@dashboard/userdashboard/viewdoctors';
// mock
import USERLIST from '../_mock/user';
import CancelBooking from './CancelBooking';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
 
//    { id: 'Doctor Name', label: 'Doctor Name', alignRight: false },
  { id: ' Schedule Date', label: 'schedule Date', alignRight: false },
  {id: 'Start time', label: 'Start time', alignRight: false},
  { id: 'End Time', label: 'End Time', alignRight: false },
  {id: 'Consulting Time', label: 'Consulting Time', alignRight: false},
  { id: 'Action', label: 'Action', alignRight: false},
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

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  let visit="YES";

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
  const[openPopup , setOpenPopup]=useState(false);
  const[openPopupCancel , setOpenPopupCancel]=useState(false);
const[id,setId]=useState(0);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [schedData, setSchedData] = useState([]);

  useEffect((event)=>{
   // event.preventDefault();
    axios.get(`http://localhost:8081/doctor/${window.sessionStorage.id}`).then((response)=>{
      setSchedData(response.data.schedule);
    })
  },[])
 
  
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
  
const deletefunc=(id)=>{
  axios.delete(`http://localhost:8081/schedules/${id}`);
  window.location.reload();
}
  
const handle=(id,val)=>{
  setId(id);
  setOpenPopupCancel(true);
}
  
  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

   const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Schedule </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Your Schedule !
          </Typography>
           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>setOpenPopup(true)}>
            New 
          </Button> 
        </Stack>

        <Card>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                
                <TableHead >
                  <TableCell style={{backgroundColor:"lightblue"}}>Date</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Start Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>End Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Consulting Time</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>Home Visit</TableCell>

                  <TableCell style={{backgroundColor:"lightblue"}}>Action</TableCell>
                  <TableCell style={{backgroundColor:"lightblue"}}>{}</TableCell>
                </TableHead>
                <TableBody>
                  
                        {schedData.map((val,index) => {
                           if(val.homevisit===false) {visit='NO'} 
                           else{visit='YES'}
                          return (
      <TableRow>
      
      <TableCell align='left'>{val.date}</TableCell>
      <TableCell align='left'>{val.stime}</TableCell>
      <TableCell align='left'>{val.etime}</TableCell>
      <TableCell align='left'>{val.atime}</TableCell>
      <TableCell align='left'>{visit}</TableCell>


      <TableCell align="left">
        <IconButton size="large" color="inherit" onClick={()=>{handle(val.id)}}>
                <Iconify icon={'charm:circle-cross'}   color="red"/>
        </IconButton>
        {/* <IconButton size="large" color="inherit" >    deletefunc(val.id)
                 <Iconify icon={'material-symbols:edit-document-outline-rounded'}  color="brown"/>
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

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Popupforms
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
          <PopupAddSchedDoctor func={addRows}/>
      </Popupforms>

      <Popupforms
        openPopup={openPopupCancel}
        setOpenPopup={setOpenPopupCancel}>
          <CancelBooking  id={id} val="null" />
      </Popupforms>
    </>
  );
}