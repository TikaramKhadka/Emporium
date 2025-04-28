'use client';
import React from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddCategory = ({ isOpen, onClose, initialValues, isEditMode, fetchCategories }) => {
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
      setBrands(response.data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      categoryName: '',
      brandId: '',
      description: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Please enter category name'),
      brandId: Yup.string().required('Please select brand name'),
      description: Yup.string().required('Please enter description'),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      debugger;
      try {
        const payload = {
          categoryName: values.categoryName,
          brandId: values.brandId,
          description: values.description,
        };

        if (isEditMode && initialValues._id) {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${initialValues._id}`, payload);
          toast.success('Category updated successfully');
        } else if (!isEditMode) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registercategories`, payload);
          toast.success('Category added successfully');
        } else {
          toast.error('Invalid category ID');
        }
        resetForm();
        fetchCategories();
        onClose();
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Error submitting category');
        }
        console.error('Error:', error);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle className="font-bold">
        {isEditMode ? 'Edit Category' : 'Add Category'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="categoryName"
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('categoryName')}
                error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                helperText={formik.touched.categoryName && formik.errors.categoryName}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="brandId"
                label="Brand Name"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                {...formik.getFieldProps('brandId')}
                error={formik.touched.brandId && Boolean(formik.errors.brandId)}
                helperText={formik.touched.brandId && formik.errors.brandId}
              >
                <MenuItem value="">Select Brand</MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </TextField>
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
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {isEditMode ? 'Update Category' : 'Add Category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCategory;
