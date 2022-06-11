import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import React, { useEffect, useState} from 'react';
import Axios from 'axios'
// ----------------------------------------------------------------------
import ShopProductCard from './ProductCard';


const initialcat ={
name: ' ',
image: ' '
}
ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList() {

  const [categorys, setCategorys] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:5000/Category').then(res => {
      setCategorys(res.data)
    })
  },[])

  return (
  
    <Grid  sx={{ flexGrow: 1 }} container spacing={3}>
    
     
        <Grid direction="row" style={{display:'grid',flexWrap:'wrap'}} item xs={12} sm={6} md={3}>
          <ShopProductCard />
        </Grid>
      

    </Grid>

   
  
  );
}
