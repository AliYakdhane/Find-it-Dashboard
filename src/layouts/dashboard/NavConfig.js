// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Category',
    path: '/Category',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Objects',
    path: '/objects',
    icon: getIcon('eva:shopping-bag-fill'),
  },




 
];

export default navConfig;
