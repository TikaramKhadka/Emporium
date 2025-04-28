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
import { useRouter } from 'next/navigation';


const Register = () => {
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),   
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*\d)/, 'Password must contain at least one number')
      .matches(/(?=.*[\W_])/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {  
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values, {
        });
        console.log('User registered successfully:', response.data);
        toast.success("User Created Successfully");
        router.push('/login');
    } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        toast.error("Registration failed. Please try again.");
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
                fullName: '',
                email: '',
                dateOfBirth: null,
                password: '',
                confirmPassword: '',
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
                      name="fullName" // Fixed name here
                      label="Fullname"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.fullName && <ErrorMessage name="fullName" />)}
                      helperText={<ErrorMessage name="fullName" component="span" style={{ color: 'red' }} />}
                    />
                    
                    {/* Email Field */}
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.email && <ErrorMessage name="email" />)}
                      helperText={<ErrorMessage name="email" component="span" style={{ color: 'red' }} />}
                    />                    
                    {/* Password Field */}
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.password && <ErrorMessage name="password" />)}
                      helperText={<ErrorMessage name="password" component="span" style={{ color: 'red' }} />}
                    />

                    {/* Confirm Password Field */}
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={Boolean(values.confirmPassword && <ErrorMessage name="confirmPassword" />)}
                      helperText={<ErrorMessage name="confirmPassword" component="span" style={{ color: 'red' }} />}
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
