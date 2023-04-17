// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'View Doctors',
    path: '/login/userdashboard/doctor',  // /dashboard/doctor
    icon: icon('ic_view')
  },
  {
    title: 'View Appointments',
    path: '/login/userdashboard/viewappointment',
    icon: icon('ic_user')
  },
  {
    title: 'Book appointment',
    path: '/login/userdashboard/bookappointment',
    icon: icon('ic_appointment')
  },
  {
    title: 'Feedback',
    path: '/login/userdashboard/feedback',
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
