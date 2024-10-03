'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Card, CardMedia, CardContent, CardActions, Button, Link } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter

const Login = () => {
  const router = useRouter(); // Initialize the router

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Handler for form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      debugger;   
      const data  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values);
      console.log('Form submitted successfully!', data);      
      // Assuming successful login, redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (e.g., show error message to the user)
    } finally {
      setSubmitting(false); // Reset form submitting status
    }
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/image/bgimage.jpg")' }}>
      <div className="flex justify-center items-center h-full">
        <Card className="flex flex-col justify-center items-center w-[400px] bg-white shadow-sm">
          <CardMedia
            component="img"
            alt="logo"
            height="140"
            image="/logo.png" // Ensure the correct path to the logo image
          />
          <CardContent>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div>
                    {/* Email Field */}
                    <Field
                      as={TextField}
                      id="outlined-email"
                      label="Email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={<ErrorMessage name="email" component="span" style={{ color: 'red' }} />}
                    />
                    {/* Password Field */}
                    <Field
                      as={TextField}
                      id="outlined-password"
                      label="Password"
                      name="password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" component="span" style={{ color: 'red' }} />}
                    />
                  </div>
                  <CardActions>
                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </CardContent>
          <p className="m-4">
            Don't have an account yet? <Link href="/register">Register</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
