// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
   {
    title: 'Set Schedule ',
     path: '/login/doctordashboard/scheduletime',  // /dashboard/doctor
     icon: icon('ic_appointment')
   },
  {
    title: ' View Appointments',
    path: '/login/doctordashboard/scheduleappointment',
    icon: icon('ic_user')
  },
//   {
//     title: 'Book appointment',
//     path: '/login/dashboard/bookappointment',
//     icon: icon('ic_appointment')
//   },
  // {
  //   title: 'View Feedback',
  //   path: '/login/doctordashboard/feedback',
  //   icon: icon('ic_feedback')
  // }
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
