// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'View Appointments',
    path: '',
    icon: icon('ic_analytics'),
  },
  {
    title: 'View Doctors',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Book Appointment',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Feedback',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
