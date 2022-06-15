import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import Axios from 'axios'
import { Box, Button, Stack,Container, Typography } from '@mui/material';
import Iconify from '../components/Iconify';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Page from '../components/Page';
// import moment from 'moment';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(0.5),
    transition: '0.3s',
    width: '100%',
    overflow: 'initial',
    background: '#ffffff',
  },
  content: {
    paddingTop: 0,
    textAlign: 'center',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
    }
  },
}));

let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}

const style = {
    position: 'absolute',
    top: '35%',
    left: '35%',
    height:180,
    width: 500,
    borderRadius:'17px',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    boxShadow: 24,
    p: 0,
  };
export const ElevatedHeaderCardDemo = React.memo(function ElevatedHeaderCard() {
  const classes = useStyles();
  const [categorys, setCategorys] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();

  useEffect(() => {
    Axios.get('http://localhost:5000/object/getAllObjects').then(res => {
      setCategorys(res.data)
    })
  },[])
  const deleteObject = (id) => {
    Axios.delete(`http://localhost:5000/object/deleteObject/${id}`)
  }
  return (
    <Page title="List objects">
    <Container style={{ width: '65rem', position: 'sticky', marginTop: '7rem', left: '20%' }}>
      <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
      List of Objects
    </Typography>
    <br/>
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)"  gap={2}>
      {categorys.map(row => (
        
            <div style={{display:'flex',flexDirection:'row'}} >
      <br/>
      <Stack spacing={0} sx={{ p: 1 }}>

    <Card className={cx(classes.card, cardShadowStyles.root)}>    
       
      <CardHeader
      style={{textAlign:'center'}}
        className={cardHeaderShadowStyles.root}
        classes={cardHeaderStyles}
        title={row.formInput.Name}
        subheader={''}
      />
      <CardContent className={classes.content}>
        <Table>

         
          <TableBody>
            
              <TableRow style={{display:'flex' ,flexDirection:'column'}}  >
              <div style={{display:'flex',justifyContent:'space-between'}} component="th" scope="row">
              <TableCell  scope="row">
              <Typography>
                Statut</Typography>
              </TableCell>
              <TableCell align="right">{row.statut}</TableCell></div>
              <div style={{display:'flex',justifyContent:'space-between'}} component="th" scope="row">
                <TableCell component="th" scope="row">
                <Typography>
                Adress</Typography>
                </TableCell>
                <TableCell align="right">{row.adress}</TableCell></div>
                <div component="th" scope="row" >
                <TableCell component="th" scope="row">
                <Typography>
                Date</Typography>
              </TableCell>
                <TableCell align="right">{row.objectDate}</TableCell></div>
                <div style={{display:'flex',justifyContent:'space-between'}}  component="th" scope="row" >
                <TableCell component="th" scope="row">
                <Typography>
                Color</Typography>
              </TableCell>
                <TableCell align="right">{row.formInput.Color? row.formInput.Color:' is empty'}</TableCell></div>
                <div style={{display:'flex',justifyContent:'space-between'}}  component="th" scope="row" >
                <TableCell component="th" scope="row">
                <Typography>
                Description</Typography>
              </TableCell>
                <TableCell align="right">{row.formInput.Description? row.formInput.Description :"Empty"}</TableCell></div>
              </TableRow>
          </TableBody>
    
      </Table>  
      <br/>
      <Stack direction="row" spacing={1} >
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
                <br/>
                <h5 style={{color:'blue',display:'flex',justifyContent:'center'}}>Are you sure for delete this object!</h5>
                <br/>
                <br/>
                <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
                <Iconify style={{cursor:'pointer'}} icon="flat-color-icons:ok" color="blue" width={34} height={32} onClick={() => {deleteObject(row._id)}}/>
                <Iconify  icon="bi:x-circle" color="red" width={34} height={32} onClick={handleClose} />

</div>
                </Box>
                </Fade>
                </Modal>
              </Stack>
      </CardContent>
    </Card> </Stack> </div> ))} </Box>
    </Stack>
    </Container>
    </Page>
  );
});

export default ElevatedHeaderCardDemo