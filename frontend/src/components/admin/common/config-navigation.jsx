import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
  
const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/index',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'packages',
    path: '/admin/AdminPackageList',
    icon: icon('ic_cart'),
  },
  {
    title: 'AddPackageImage',
    path: '/admin/AddPackageImages',
    icon: icon('ic_cart'),
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: icon('ic_blog'),
  },
  {
    title: 'Hotels',
    path: '/admin/Hotels',
    icon: icon('ic_building'),
  },
  {
    title: 'Bookings',
    path: '/admin/booking-table',
    icon: icon('ic_blog'),
  },
  {
    title: 'Itineraries',
    path: '/admin/Itineraries',
    icon: icon(''),
  },
  {
    title: 'Itineraries',
    path: '/admin/Itineraries',
    icon: icon(''),
  },
  {
    title: 'login',
    path: '/admin/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
