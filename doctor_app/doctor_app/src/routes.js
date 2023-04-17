import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple';
//
import DoctorRegistration from './pages/DoctorRegistration';
import UserProfile from './pages/UserProfile';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registration';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import AppointmentBooking from './pages/AppointmentBooking';
import ViewAppointment from './pages/ViewAppointment';
import DoctorManagement from './pages/DoctorManagement';
import PatientManagement from './pages/PatientManagement';
import ScheduleManagement from './pages/ScheduleManagement';
import AppFirst from './pages/AppFirst';
import DashboardLayoutAdmin from './layouts/dashboard/DashboardLayoutAdmin';
import  DashboardLayoutDoctor from './layouts/dashboard/DashboardLayoutDoctor';
import CheckAppointment from './pages/CheckAppointment';
import ScheduleTime from './pages/ScheduleTime';
// import PopUpForms from './pages/PopUpForms';
import FeedbackPage from './pages/FeedbackPage';
import About from './pages/About';
import CheckDoc from './pages/CheckDoc';
import ForgotPass from './pages/ForgotPass';
import Verifyotp from './pages/Verifyotp';
import ForgotSetPassword from './pages/ForgotSetPassword';
import ViewFeddBacks from './pages/ViewFeddBacks';
import AppointmentManagement from './pages/AppointmentManagement';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
     path: '/', 
     element: <AppFirst />,
     children :[
     {element: <Navigate to="/" />,index: true},
     {path : '',element: <AppFirst />}
     ]
    },
    {
      path:'/login/userdashboard',
      element : <DashboardLayout />,
      children: [
        { element: <Navigate to="/login/userdashboard/doctor" />, index: true },
        { path: 'doctor', element: <UserPage /> },
        { path: 'viewappointment', element: <ViewAppointment /> },
        { path: 'bookappointment', element: <AppointmentBooking /> },
        { path: 'feedback', element: <FeedbackPage />},
      ]
    },
    {
      path:'/login/admindashboard',
      element : <DashboardLayoutAdmin />,
      children: [
        { element: <Navigate to="/login/admindashboard/doctormanagement" />, index: true },
        { path: 'doctormanagement', element: <DoctorManagement /> },
        { path: 'usermanagement', element: <PatientManagement /> },
        { path: 'schedmanagement', element: <ScheduleManagement /> },
        {path:'appointmentmanagement',element:<AppointmentManagement />},
        { path: 'feedback', element: <ViewFeddBacks />},
      ]
    },
    {
      path:'/login/doctordashboard',
      element : <DashboardLayoutDoctor />,
      children: [
        { element: <Navigate to="/login/doctordashboard/scheduletime" />, index: true },
        { path: 'scheduletime', element: <ScheduleTime /> },
        { path: 'scheduleappointment', element: <CheckAppointment /> }
        // { path: 'feedback', element: <AppointmentBooking />},
      ]
    },
     {
       path: 'login',
       element: <LoginPage />
     },
     {
      path:"reset",
      element:<ForgotSetPassword />
     },
     {
      path:"feedback",
      element:<ViewFeddBacks />
     },
     {
      path:'check',
      element:<CheckDoc />
     },
     {
        path:'about',
        element:<About />
     },
     {
        path:'/verify',
        element:<Verifyotp />
     },
    // {
    //    path:'popup',
      //  element:<PopUpForms />
     // },
     {
      path:'forgot',
      element:<ForgotPass />
     },
     {
      path:'feedback',
       element:<FeedbackPage />
    },
    {
      path:'registration',
      element:<Registration />
    },
    {
      path:'userprofile',
      element:<UserProfile />
    },
    {
      path:'doctorregistration',
      element:<DoctorRegistration />
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login/userdashboard" />, index: true },
        { element: <Navigate to="/login/doctordashboard" />, index: true },
        { element: <Navigate to="/login/admindashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
