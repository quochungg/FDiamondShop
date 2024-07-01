// EditProductPage.jsx
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Switch,
  // Checkbox,
  Snackbar,
  TextField,
  Container,
  AlertTitle,
  Typography,
  InputLabel,
  CardHeader,
  CardContent,
  FormControl,
  OutlinedInput,
  // FormControlLabel,
} from '@mui/material';

import uploadFile from 'src/utils/upload';

import { AddMutipleFile } from 'src/components/upload';

const EditProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: 0,
    productName: '',
    basePrice: 0,
    quantity: 0,
    isVisible: false,
    productImages: [],
    GIAImages: [],
    productVariantValues: [],
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    basePrice: '',
    quantity: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const variantMapping = useCallback(
    () => ({
      diamond: [
        { variantId: 1, key: 'Color' },
        { variantId: 2, key: 'clarity' },
        { variantId: 3, key: 'Cut' },
        { variantId: 4, key: 'CaratWeight' },
        { variantId: 5, key: 'Florescence' },
        { variantId: 6, key: 'Length' },
        { variantId: 7, key: 'Depth' },
      ],
      necklace: [{ variantId: 8, key: 'NecklaceMetal' }],
      ring: [
        { variantId: 9, key: 'RingMetal' },
        { variantId: 10, key: 'Size' },
      ],
      earring: [{ variantId: 11, key: 'EarringMetal' }],
    }),
    []
  );

  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`https://fdiamond-api.azurewebsites.net/api/Product/${id}`)
      .then((response) => {
        const productData = response.data.result;
        const productVariants = productData.productVariantValues.map((variant) => ({
          ...variant,
          key: Object.values(variantMapping())
            .flat()
            .find((v) => v.variantId === variant.variantId)?.key,
        }));
        setProduct({
          ...productData,
          // productImages: productData.productImages.filter((img) => img.isGia === false),
          // GIAImages: productData.productImages.filter((img) => img.isGia),
          productVariantValues: productVariants,
        });
        console.log(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [id, variantMapping]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (name === 'basePrice' || name === 'quantity') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleVariantChange = (event, variantId) => {
    const { value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      productVariantValues: prevProduct.productVariantValues.map((variant) =>
        variant.variantId === variantId ? { ...variant, value } : variant
      ),
    }));
  };

  const handleImageSelect = (fileList, isGia = false) => {
    if (isGia) {
      setProduct((prevData) => ({
        ...prevData,
        GIAImages: fileList,
      }));
    } else {
      setProduct((prevData) => ({
        ...prevData,
        productImages: fileList,
      }));
    }
  };

  const uploadFiles = async (fileList) => {
    const uploadPromises = fileList.map((file) => {
      if (file.originFileObj) {
        return uploadFile(file.originFileObj);
      }
      if (file.url) {
        return file.url;
      }
      throw new Error('No file provided');
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (product.basePrice < 0) {
      validationErrors.basePrice = 'Price cannot be negative';
    }

    if (product.quantity < 0) {
      validationErrors.quantity = 'Quantity cannot be negative';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOpenSnackbar(true);
      return;
    }
    // Log the product object to see what is being sent
    console.log('Submitting product:', product);

    // Filter out unnecessary fields
    try {
      const newProductFiles = product.productImages.filter((file) => !file.url);
      const newGIAFiles = product.GIAImages.filter((file) => !file.url);

      const productFileUrls = await uploadFiles(newProductFiles);
      const GIAFileUrls = await uploadFiles(newGIAFiles);

      const allProductFiles = [
        ...product.productImages
          .filter((file) => file.url)
          .map((file) => ({ imageUrl: file.url, isGia: false })),
        ...productFileUrls.map((url) => ({ imageUrl: url, isGia: false })),
      ];

      const allGIAFiles = [
        ...product.GIAImages.filter((file) => file.url).map((file) => ({
          imageUrl: file.url,
          isGia: true,
        })),
        ...GIAFileUrls.map((url) => ({ imageUrl: url, isGia: true })),
      ];

      const productVariantValues = product.productVariantValues.map((variant) => ({
        variantId: variant.variantId,
        value: variant.value,
      }));

      const payload = {
        ...product,
        productImages: [...allProductFiles, ...allGIAFiles],
        productVariantValues,
      };

      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Product/${id}`,
        payload
      );
      console.log('Product updated:', response.data);
      navigate('/products', { state: { showSnackbar: true } });
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setOpenSnackbar(true);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Product information" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth required>
                  <InputLabel>Product name</InputLabel>
                  <OutlinedInput
                    value={product.productName}
                    onChange={handleInputChange}
                    label="Product Name"
                    name="productName"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    value={product.basePrice}
                    onChange={handleInputChange}
                    label="Price"
                    name="basePrice"
                    type="number"
                  />
                  {errors.basePrice && (
                    <Typography variant="caption" color="error">
                      {errors.basePrice}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Quantity</InputLabel>
                  <OutlinedInput
                    value={product.quantity}
                    onChange={handleInputChange}
                    label="Quantity"
                    name="quantity"
                    type="number"
                  />
                  {errors.quantity && (
                    <Typography variant="caption" color="error">
                      {errors.quantity}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              {product.productVariantValues.map((variant, index) => (
                <Grid item xs={6} key={index}>
                  <FormControl fullWidth required>
                    <InputLabel>{variant.key}</InputLabel>
                    <OutlinedInput
                      value={variant.value}
                      onChange={(event) => handleVariantChange(event, variant.variantId)}
                      label={variant.key}
                      name={variant.key}
                    />
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <TextField
                    value={product.description}
                    onChange={handleInputChange}
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Product Images
                  </Typography>
                  <AddMutipleFile
                    initialFiles={product.productImages.filter((img) => img.isGia === false)}
                    onImageSelect={(fileList) => handleImageSelect(fileList, false)}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Upload GIA Report
                  </Typography>
                  <AddMutipleFile
                    initialFiles={product.productImages.filter((img) => img.isGia)}
                    onImageSelect={(fileList) => handleImageSelect(fileList, true)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl component="fieldset">
                  <Grid container alignItems="center">
                    <Grid item>
                      <Grid item>
                        <Switch
                          checked={product.isVisible}
                          onChange={handleInputChange}
                          name="isVisible"
                        />
                      </Grid>
                      <Grid item>
                        <Typography>Publish</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)}
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          Error submitting product data. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProductPage;
