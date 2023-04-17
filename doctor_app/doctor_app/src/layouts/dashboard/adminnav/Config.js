// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: ' Doctor Management',
    path: '/login/admindashboard/doctormanagement',  // /dashboard/doctor
    icon: icon('ic_view')
  },
  {
    title: ' Schedule Management',
    path: '/login/admindashboard/schedmanagement',
    icon: icon('ic_appointment')
  },
  {
    title: ' Patient Management',
    path: '/login/admindashboard/usermanagement',
    icon: icon('ic_view')
  },
  {
    title: ' Appointment Management',
    path: '/login/admindashboard/appointmentmanagement',
    icon: icon('ic_appointment')
  },
 
  {
    title: 'View Feedback',
    path: '/login/admindashboard/feedback',
    icon: icon('ic_feedback')
  },
  // {
  //   title: 'login',   
  //   path: '/login',
  //   icon: icon('ic_lock')
  // },
  // {
  //   title: 'Not found',
  //   path: '/login/404',
  //   icon: icon('ic_disabled')
  // },
];

export default navConfig;
