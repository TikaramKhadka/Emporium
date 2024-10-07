'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Card, CardMedia, CardContent, CardActions, Button, Link } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Router } from 'next/router';

const Register = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    birthdate: Yup.date().nullable().required('Birthdate is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*\d)/, 'Password must contain at least one number')
      .matches(/(?=.*[\W_])/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Handler for form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {    
      debugger 
      const data  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
      console.log('User registered successfully:', data);
      toast.success("User Created Successfully")
      Router.push('/login')
      // Show success message or handle redirection
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error, e.g., show error message
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/image/bgimage.jpg")' }}>
      <div className="flex justify-center items-center h-full">
        <Card className="flex flex-col justify-center items-center w-[400px] bg-white shadow-sm">
          <CardMedia
            component="img"
            alt="Ecomsol"
            height="140"
            image="/emporiumlogo.png"
          />
          <CardContent>
            <Formik
              initialValues={{
                fullname: '',
                email: '',
                birthdate: null,
                password: '',
                confirmpassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <div>
                    {/* Fullname Field */}
                    <Field
                      as={TextField}
                      name="fullname"
                      label="Fullname"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.fullname && ErrorMessage.name)}
                      helperText={<ErrorMessage name="fullname" component="span" style={{ color: 'red' }} />}
                    />
                    
                    {/* Email Field */}
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.email && ErrorMessage.name)}
                      helperText={<ErrorMessage name="email" component="span" style={{ color: 'red' }} />}
                    />

                    {/* Date of Birth Picker */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        value={values.birthdate ? dayjs(values.birthdate) : null}
                        onChange={(newValue) => setFieldValue('birthdate', newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            margin="normal"
                            error={Boolean(values.birthdate && ErrorMessage.name)}
                            helperText={<ErrorMessage name="birthdate" component="span" style={{ color: 'red' }} />}
                          />
                        )}
                      />
                    </LocalizationProvider>

                    {/* Password Field */}
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.password && ErrorMessage.name)}
                      helperText={<ErrorMessage name="password" component="span" style={{ color: 'red' }} />}
                    />

                    {/* Confirm Password Field */}
                    <Field
                      as={TextField}
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.confirmpassword && ErrorMessage.name)}
                      helperText={<ErrorMessage name="confirmpassword" component="span" style={{ color: 'red' }} />}
                    />
                  </div>
                  <CardActions>
                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                      Register
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </CardContent>
          <p className="m-4">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
