import { useState } from 'react';
// material
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Backdrop from '@mui/material/Backdrop';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Category() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="Dashboard: category">
    <Container style={{width:'65rem',position:'sticky',marginTop:'7rem',left:'30%'}} >
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        Category
      </Typography>
      <Link to ='/dashboard/formbuilder'>
      <Button variant="contained" >
        New Category
      </Button></Link>

    </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          
            <ProductSort />
          </Stack>
        </Stack>
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center"  sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>     
           <ProductList direction="row" style={{display:'flex',flexDirection:'row'}} products={PRODUCTS} />
        </Stack>
        </Stack>
      </Container>
    </Page>
  );
}
