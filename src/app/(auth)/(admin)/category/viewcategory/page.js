'use client';
import React from 'react';
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ViewCategory = ({ isOpen, onClose, categoryDetails }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle className='font-bold'>Category Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Category Name: {categoryDetails?.categoryName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Brand Name: {categoryDetails?.brandName || ''}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">Description: {categoryDetails?.description || 'No Description'}</Typography>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCategory;
