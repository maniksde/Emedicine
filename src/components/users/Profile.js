import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Header';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Constant';
import { borderRadius } from '@mui/system';


const theme = createTheme();

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .required('Last Name is required'),
    currentPassword: yup
        .string('Enter your currentPassword')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('currentPassword is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const Profile = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const user = {
                'firstName': values.firstName,
                'lastName': values.lastName,
                'password': values.password,
                'email': values.email,
                'fund': 0,
                'type': 'user',
                'status': 1,
            }
            const url = baseUrl + 'registration';
            //   var res = await axios.post(url, user);
            //   if (res.data.statusCode === 200){
            //     navigate("/");
            //   }

        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        formik.handleSubmit();

    };
    return (
        <div>
            <Header />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Profile
                        </Typography>
                        <br/>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <PhotoCamera 
                                    
                                    style={{
                                        color : "primary",
                                        backgroundColor : '#f2f2f2',
                                        width:'30px',
                                        height:'30px',
                                        borderRadius : '30px',
                                        border:'2px solid #f2f2f2',
                                        boxShadow :'0 0 0 2px #f2f2f2',
                                        cursor : 'pointer'

                                    }}
                                />
                            }
                        >
                            <Avatar
                                sx={{ 
                                    width: 120, 
                                    height: 120,
                                    boxShadow :'0 0 0 5px #f2f2f2',
                                    padding : '2px',
                                    cursor : 'pointer'
                                 }}
                                src='http://127.0.0.1:8887/image57.jpg'

                            />
                        </Badge>


                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="currentPassword"
                                        label="Current Password"
                                        name="currentPassword"
                                        autoComplete="currentPassword"
                                        value={formik.values.currentPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="confirm-password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                            
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>

        </div>
    )
}

export default Profile;