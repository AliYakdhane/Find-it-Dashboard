import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, List, Stack, Button } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '35%',
  left: '35%',
  height:150,
  width: 500,
  borderRadius:'17px',
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: 24,
  p: 0,
};
export default function UserMoreMenu() {
  const [categorys, setCategorys] = useState([0])

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/user/delete/${id}`)
  }
  return (
    <> 
     <div>
    
     <Stack spacing={2} sx={{ p: 3 }}>
     {  categorys.map((val,key) => (
     <Stack direction="row" >
      <Stack direction="row" spacing={1} key={key}>
              <Button  fullWidth size="large" color="inherit" variant="outlined" onClick={handleOpen}>
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
            
                <div  key={key} style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
                <Iconify style={{cursor:'pointer'}} icon="flat-color-icons:ok" color="blue" width={34} height={32} onClick={() => {deleteCategory(val._id)}}/>
                <Iconify  icon="bi:x-circle" color="red" width={34} height={32} onClick={handleClose} />

</div> 
                </Box>
                </Fade>
                </Modal>      <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="ant-design:edit-outlined" color="blue" width={24} height={22} />
              </Button></Stack>
              </Stack>
 ))
      
  }
     </Stack>
        
  </div>

    </>
  );
}
