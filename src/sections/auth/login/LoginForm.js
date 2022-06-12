import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {  Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from "react-redux";
import { CFormInput } from "@coreui/react";
import axios from "axios";

// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
const initialState = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const [user, setUser] = useState(initialState);

  const history = useHistory();
  const { email, password } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value});
  };
  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/admin/login`, {
        email,
        password,
      });
      console.log(res)
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("userName",res.data.userName)
      localStorage.setItem("email",res.data.email)
      localStorage.setItem("firstLogin", true);

      history.push("/dashboard");
    } catch (err) {
        console.log('-----------------------mena 7ot msg error')
    }
  };



  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      history('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmite}>
        <Stack spacing={3}>
        <CFormInput type="text" placeholder="Enter email address" id="email"
        value={email} name="email" onChange={handleChangeInput} /> <br/>          
        <CFormInput type="password" placeholder="Enter password" id="password"
        value={password} name="password" onChange={handleChangeInput} />  
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link  variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
