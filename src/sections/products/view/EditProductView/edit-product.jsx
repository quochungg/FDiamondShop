// EditProductPage.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  TextField,
  Container,
  Typography,
  FormControlLabel,
} from '@mui/material';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productId: 0,
    productName: '',
    basePrice: 0,
    quantity: 0,
    subCategoryId: 0,
    isVisible: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`https://fdiamond-api.azurewebsites.net/api/Product/${id}`)
      .then((response) => {
        const productData = response.data.result;
        setProduct({
          productId: productData.productId || 0,
          productName: productData.productName || '',
          basePrice: productData.basePrice || 0,
          quantity: productData.quantity || 0,
          subCategoryId: productData.subCategoryId || 0,
          isVisible: productData.isVisible || false,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the product object to see what is being sent
    console.log('Submitting product:', product);

    // Filter out unnecessary fields
    const { productId, productName, basePrice, quantity, subCategoryId, isVisible } = product;
    const payload = {
      productId,
      productName,
      basePrice: Number(basePrice), // Ensure basePrice is a number
      quantity: Number(quantity), // Ensure quantity is a number
      subCategoryId: Number(subCategoryId), // Ensure subCategoryId is a number
      isVisible,
    };

    axios
      .put(`https://fdiamond-api.azurewebsites.net/api/Product/${id}`, payload)
      .then((response) => {
        console.log('Product updated:', response.data);
        navigate('/products'); // Redirect to product list page after successful update
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        if (error.response) {
          // Log the response data for detailed error information
          console.error('Error response data:', error.response.data);
        }
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Product Name"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Base Price"
          name="basePrice"
          type="number"
          value={product.basePrice}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Sub Category ID"
          name="subCategoryId"
          type="number"
          value={product.subCategoryId}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControlLabel
          control={
            <Checkbox checked={product.isVisible} onChange={handleChange} name="isVisible" />
          }
          label="Visible"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default EditProductPage;
