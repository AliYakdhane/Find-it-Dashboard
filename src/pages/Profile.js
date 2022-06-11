
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import {Container, Card, Box,Stack,Button} from  '@mui/material'
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { CFormInput } from "@coreui/react";
import { useFormik, Form, FormikProvider } from 'formik';

import Page from '../components/Page'
const useStyles = makeStyles(() => ({
  action: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));

export default function Profile() {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 28, size: 58, marginTop:'1rem'});
  return (
    <Page title="User">
   
    <Container style={{width:'65rem',position:'sticky',marginTop:'7rem',left:'20%',display:'flex',justifyContent:'center'}} >
    <Card bgcolor={'#E8F1F2'} style={{backgroundColor:'#E8F1F2',height:'30rem',width:'37rem',display:'flex',justifyContent:'center'}} borderRadius={16} >
    <br/>
    <Box style={{display:'flex',flexDirection:'column'}}>
    <div style={{display:'flex',justifyContent:'center'}} >
      <Item>
      <br/>
        <Avatar
        
          classes={avatarStyles}
          src={
            'https://www.biography.com/.image/t_share/MTU0ODUwMjQ0NjIwNzI0MDAx/chris-hemsworth-poses-during-a-photo-call-for-thor-ragnarok-on-october-15-2017-in-sydney-australia-photo-by-mark-metcalfe_getty-images-for-disney-square.jpg'
          }
        /> 
        <br/>
       
      </Item>
      </div>
      <div style={{display:'flex',justifyContent:'center'}} >
     
      <Info  useStyles={useTutorInfoStyles}>
        <InfoTitle >Ali Yakdhane</InfoTitle>
      </Info>
     </div> 
     <br/>
     <br/>
     <Stack spacing={3}>
     <Box container spacing={4} style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
       <CFormInput  style={{marginRight:'5px'}} type="text" placeholder="Enter email address" id="email"
        name="email" /> <br/>          
       <CFormInput style={{marginLeft:'5px'}} type="text" placeholder="Enter name" id="name"
        name="name" />  </Box>
       <br/>          
       <Box container spacing={4} style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
       <CFormInput style={{marginRight:'5px'}} type="password" placeholder="Enter your  password" id="password"
        name="email" /> <br/>          
       <CFormInput style={{marginLeft:'5px'}} type="password" placeholder="Enter new password" id="password"
        name="password" />  </Box>
      </Stack>
      <br/> <br/>
      <Button  variant="contained" to="#" >
Submit    </Button>
      </Box>
      
    </Card>
    </Container></Page>
  );
};