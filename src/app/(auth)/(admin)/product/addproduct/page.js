'use client';
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProduct = ({ isOpen, onClose, initialValues, isEditMode, fetchProducts }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Formik setup with enableReinitialize to reinitialize form when initialValues change
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      productName: '',
      categoryId: '',
      price: '',
      quantity: '',
      description: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Please enter product name'),
      categoryId: Yup.string().required('Please select a category'),
      price: Yup.number().required('Please enter price').min(0, 'Price must be greater than or equal to 0'),
      quantity: Yup.number().required('Please enter quantity').min(1, 'Quantity must be at least 1'),
      description: Yup.string().required('Please enter description'),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values, categoryId: values.categoryId.trim() };
        if (isEditMode && initialValues._id) {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${initialValues._id}`, payload);
          toast.success('Product updated successfully');
        } else if (!isEditMode) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registerproducts`, payload);
          toast.success('Product added successfully');
        } else {
          toast.error('Invalid product ID');
        }
        resetForm();
        fetchProducts();
        onClose();
      } catch (error) {
        toast.error('Error submitting product');
        console.error('Error:', error);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle className='font-bold'>
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="productName"
                label="Product Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('productName')}
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="categoryId"
                label=""
                select
                SelectProps={{ native: true }}
                fullWidth
                margin="normal"
                {...formik.getFieldProps('categoryId')}
                error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                helperText={formik.touched.categoryId && formik.errors.categoryId}
              >
                <option value="">Select Category</option>
                {categories && categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                {...formik.getFieldProps('price')}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                {...formik.getFieldProps('quantity')}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...formik.getFieldProps('description')}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProduct;
