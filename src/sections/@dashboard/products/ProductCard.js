import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState} from 'react';
import Axios from 'axios'
import Iconify from '../../../components/Iconify';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  borderBottom: '1px solid #ddd'
});



ShopProductCard.propTypes = {
  product: PropTypes.object,
};
const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  
  maxWidth: '50%',
  borderRadius:'17px',
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: 24,
  p: 0,
};

export default function ShopProductCard({ product }) {
  const [ name, image] = useState([])
  const [categorys, setCategorys] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    Axios.get('http://localhost:5000/Category').then(res => {
      setCategorys(res.data)
    })
  },[])
  const deleteCategory = (id) => {
    Axios.delete(`http://localhost:5000/category/deleteCateogry/${id}`)
  }
  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
    {  categorys.map((val,key) => (
      <Stack spacing={2} sx={{ p: 2 }}>
      <Card margin='1rem' direction="row"  key={key}>
        
      <Box  sx={{ pt: '100%', borderBottom:'1px solid #ddd' }}>
        <ProductImgStyle alt={name} src={val.image} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
          
            <Typography variant="subtitle2" noWrap>
            {val.name}
             </Typography>
            <br />
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleOpen}>
                <Iconify icon="fluent:delete-28-regular" color="#DF3E30" width={24} height={22}  />
              </Button>
              <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                <h5 style={{color:'blue',display:'flex',justifyContent:'center'}}>Are you sure for delete this category!</h5>
                <br/>
                <br/>
                <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
                <Iconify style={{cursor:'pointer'}} icon="flat-color-icons:ok" color="blue" width={34} height={32} onClick={() => {deleteCategory(val._id)}}/>
                <Iconify  icon="bi:x-circle" color="red" width={34} height={32} onClick={handleClose}/>

</div>
                </Box>
                </Fade>
                </Modal>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="ant-design:edit-outlined" color="blue" width={24} height={22} />
              </Button></Stack>


        </Stack>
        </Card>
        </Stack>))
      
  }

      </Box>
  );
}
