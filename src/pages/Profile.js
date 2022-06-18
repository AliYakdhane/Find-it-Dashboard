import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
// import { isLength, } from '../utils/validation/Validation.js';
import { showSuccessMsg, showErrMsg } from '../utils/notification/Notification';
import { Container, Card, Box, Stack, Button } from '@mui/material';
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { CFormInput } from '@coreui/react';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';

import Page from '../components/Page';
import { useEffect } from 'react';
import { useState } from 'react';
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
const initialState = {
  name: '',
  oldPassword: '',
  password: '',
  err: '',
  success: '',
};
export default function Profile() {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 28, size: 58, marginTop: '1rem' });
  const [categorys, setCategorys] = useState({});
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const { name, password, email, oldPassword, err, success } = data;
  useEffect(() => {
    console.info(categorys);
    axios.get(`http://localhost:5000/admin/profil/${localStorage.getItem('userId')}`).then((res) => {
      // let aaa = Object.entries(res.data);
      // console.info(aaa);
      setCategorys(res.data);
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };
  const updateInfor = () => {
    try {
      axios.put(`http://localhost:5000/admin/update/${localStorage.getItem('userId')}`, {
        name: name ? name : categorys.name,
        email: email ? email : categorys.email,
      });

      setData({ ...data, err: '', success: 'Updated Success!' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };
  const updatePassword = () => {
    // if (isLength(password)) return setData({ ...data, err: 'Password must be at least 6 characters.', success: '' });

    // if (!isMatch(password, oldPassword)) return setData({ ...data, err: 'Password did not match.', success: '' });

    try {
      axios.put(`http://localhost:5000/admin/update/${localStorage.getItem('userId')}`, { password, oldPassword });

      setData({ ...data, err: '', success: 'Updated Success!' });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };

  const handleUpdate = () => {
    if (name || email) updateInfor();
    if (password) updatePassword();
  };
  const handleDelete = async (id) => {
    try {
      if (localStorage.getItem('userId') !== id) {
        if (window.confirm('Are you sure you want to delete this account?')) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`);
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };
  return (
    <Page title="User">
      <Container
        style={{
          width: '65rem',
          position: 'sticky',
          marginTop: '7rem',
          left: '20%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <h3>Loading.....</h3>}
        </div>
        <Card
          bgcolor={'#E8F1F2'}
          style={{
            backgroundColor: '#E8F1F2',
            height: '30rem',
            width: '37rem',
            display: 'flex',
            justifyContent: 'center',
          }}
          borderRadius={16}
        >
          <br />
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Item>
                <br />
                <Avatar
                  classes={avatarStyles}
                  src={
                    'https://www.biography.com/.image/t_share/MTU0ODUwMjQ0NjIwNzI0MDAx/chris-hemsworth-poses-during-a-photo-call-for-thor-ragnarok-on-october-15-2017-in-sydney-australia-photo-by-mark-metcalfe_getty-images-for-disney-square.jpg'
                  }
                />
                <br />
              </Item>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Info useStyles={useTutorInfoStyles}>
                <InfoTitle> {'Admin'} </InfoTitle>
              </Info>
            </div>
            <br />
            <br />
            <Stack spacing={3}>
              <Box
                container
                spacing={4}
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <CFormInput
                  style={{ marginRight: '5px' }}
                  type="text"
                  placeholder={categorys.email}
                  id="email"
                  name="email"
                />{' '}
                <br />
                <CFormInput
                  style={{ marginLeft: '5px' }}
                  type="text"
                  placeholder={categorys.name}
                  id="name"
                  name="name"
                />{' '}
              </Box>
              <br />
              <Box
                container
                spacing={4}
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <CFormInput
                  style={{ marginRight: '5px' }}
                  type="password"
                  placeholder="Enter your  password"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
                />{' '}
                <br />
                <CFormInput
                  style={{ marginLeft: '5px' }}
                  type="password"
                  placeholder="Enter new password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />{' '}
              </Box>
            </Stack>
            <br /> <br />
            <Button variant="contained" to="#" disabled={loading} onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
