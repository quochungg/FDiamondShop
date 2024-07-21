import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Select,
  Switch,
  MenuItem,
  Snackbar,
  Container,
  TextField,
  AlertTitle,
  CardHeader,
  InputLabel,
  Typography,
  CardContent,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import uploadFile from 'src/utils/upload';

import { RingForm, DiamondForm, EarringForm, NecklaceForm } from 'src/components/form';

// import { AddImageForm } from 'src/components/upload';

import { AddMutipleFile } from 'src/components/upload';

export default function NewProductView() {
  const [formData, setFormData] = useState({
    category: 'diamond',
    subCategoryName: '',
    productName: '',
    basePrice: '',
    quantity: '',
    description: '',
    isVisible: false,
    productImages: [],
    GIAImages: [],
    Color: '', // Giá trị mặc định
    clarity: '', // Giá trị mặc định
    Cut: '', // Giá trị mặc định
    CaratWeight: '', // Giá trị mặc định
    Florescence: '', // Giá trị mặc định
    Length: '', // Giá trị mặc định
    Depth: '', // Giá trị mặc định
    Width: '', // Giá tr
    RingMetal: '',
    EarringMetal: '',
    NecklaceMetal: '',
  });

  const [errors, setErrors] = useState({
    basePrice: '',
    quantity: '',
  });

  // const [selectedImage, setSelectedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    const newValue = event.target.type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
    if (name === 'basePrice' || name === 'quantity') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleImageSelect = (fileList, isGia = false) => {
    if (isGia) {
      setFormData((prevData) => ({
        ...prevData,
        GIAImages: Array.from(fileList),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        productImages: Array.from(fileList),
      }));
    }
  };

  const category = [
    { value: 'diamond', label: 'Diamond' },
    { value: 'ring', label: 'Ring' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'earring', label: 'Earring' },
  ];

  const variantMapping = {
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
      { variantId: 10, key: 'Width' },
    ],
    earring: [{ variantId: 11, key: 'EarringMetal' }],
  };

  const uploadFiles = async (fileList) => {
    const uploadPromises = fileList.map((file) => {
      if (file.originFileObj) {
        return uploadFile(file.originFileObj);
      }
      if (file.url) {
        return file.url; // Return the existing URL if already uploaded
      }
      throw new Error('No file provided');
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (formData.basePrice < 0) {
      validationErrors.basePrice = 'Price cannot be negative!';
    }

    if (formData.quantity < 0) {
      validationErrors.quantity = 'Quantity cannot be negative!';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOpenSnackbar(true);
      return;
    }

    try {
      // Upload files to Firebase Storage
      const productFileUrls = await uploadFiles(formData.productImages);
      const GIAFileUrls = await uploadFiles(formData.GIAImages);

      const productVariantValues = variantMapping[formData.category].map((variant) => ({
        variantId: variant.variantId,
        value: formData[variant.key],
      }));

      const productData = {
        subCategoryName: formData.subCategoryName,
        productName: formData.productName,
        quantity: formData.quantity, // Assuming default value is 0
        basePrice: formData.basePrice,
        description: formData.description,
        isVisible: formData.isVisible,
        productImages: [
          ...productFileUrls.map((url) => ({ imageUrl: url, isGia: false })),
          ...GIAFileUrls.map((url) => ({ imageUrl: url, isGia: true })),
        ], // Save URLs of uploaded images
        productVariantValues,
      };
      console.log('Submitting product data:', productData);
      const response = await axios.post(
        'https://fdiamond-api.azurewebsites.net/api/Product',
        productData
      );
      console.log('API response:', response.data);
      // setOpenSnackbar(true);
      navigate('/products', { state: { showSnackbar: true } }); // Redirect to product list page after successful update

      // Gửi dữ liệu lên server hoặc xử lý dữ liệu tại đây
    } catch (error) {
      console.error('Error uploading files or submitting product data:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Add new product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Product information" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                    name="category"
                    variant="outlined"
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl fullWidth required>
                  <InputLabel>Product name</InputLabel>
                  <OutlinedInput
                    value={formData.productName}
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
                    value={formData.basePrice}
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
              {formData.category !== 'ring' && (
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Quantity</InputLabel>
                    <OutlinedInput
                      value={formData.quantity}
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
              )}
              {/* {formData.category === 'ring' && (
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Quantity</InputLabel>
                    <OutlinedInput
                      value={10000}
                      disabled
                      label="Quantity"
                      name="quantity"
                      type="number"
                    />
                  </FormControl>
                </Grid>
              )} */}
              {formData.category === 'diamond' && (
                <DiamondForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {formData.category === 'ring' && (
                <RingForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {formData.category === 'necklace' && (
                <NecklaceForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {formData.category === 'earring' && (
                <EarringForm formData={formData} handleInputChange={handleInputChange} />
              )}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <TextField
                    value={formData.description}
                    onChange={handleInputChange}
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Product Images
                  </Typography>
                  <AddMutipleFile
                    onImageSelect={(fileList) => handleImageSelect(fileList, false)}
                  />
                </FormControl>
              </Grid>

              {formData.category === 'diamond' && (
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <Typography variant="subtitle1" gutterBottom>
                      Upload GIA Report
                    </Typography>
                    <AddMutipleFile
                      onImageSelect={(fileList) => handleImageSelect(fileList, true)}
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={8}>
                <FormControl component="fieldset">
                  <Grid container alignItems="center">
                    <Grid item>
                      <Switch
                        checked={formData.isVisible}
                        onChange={handleInputChange}
                        name="isVisible"
                      />
                    </Grid>
                    <Grid item>
                      <Typography>Publish</Typography>
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
                    Submit
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
}
