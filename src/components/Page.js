import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import ScrollToTop from './ScrollToTop';
import { Box } from '@mui/material';
import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar';
import DashboardSidebar from 'src/layouts/dashboard/DashboardSidebar';
const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
  <DashboardNavbar/>
  <DashboardSidebar/>
  <ScrollToTop/>
    <Helmet>
      <title>{`${title} | Find it`}</title>
      {meta}
    </Helmet>

    <Box style={{display:'flex',justifyContent:'center'}} ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
