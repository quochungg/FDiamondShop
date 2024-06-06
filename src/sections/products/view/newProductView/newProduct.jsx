// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Button,
  Select,
  Switch,
  MenuItem,
  Container,
  TextField,
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
    subcatgory_name: '',
    productName: '',
    basePrice: '',
    description: '',
    isVisible: false,
    productImages: [],
    Color: '', // Giá trị mặc định
    clarity: '', // Giá trị mặc định
    Cut: '', // Giá trị mặc định
    CaratWeight: '', // Giá trị mặc định
    Florescence: '', // Giá trị mặc định
    Length: '', // Giá trị mặc định
    Depth: '', // Giá trị mặc định
    Size: '', // Giá tr
    Metal: '',
  });
  // const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    const newValue = event.target.type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleImageSelect = (fileList) => {
    setFormData((prevData) => ({
      ...prevData,
      productImages: fileList,
    }));
  };
  // const handleCancel = () => {
  //   // Reset form fields to initial state
  //   setFormData({
  //     category: 'diamond',
  //     productName: '',
  //     price: '',
  //     description: '',
  //     status: false, // Set the default status to 'hide'
  //   });
  //   // Reset the selected image
  //   setSelectedImage(null);
  // };

  const category = [
    { value: 'diamond', label: 'Diamond' },
    { value: 'ring', label: 'Ring' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'earring', label: 'Earring' },
  ];

  const uploadFiles = async (files) => {
    const uploadPromises = files.map((file) => {
      if (file.originFileObj) {
        return uploadFile(file.originFileObj);
      }
      throw new Error('No file provided');
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload files to Firebase Storage
      const fileUrls = await uploadFiles(formData.productImages);

      const productData = {
        ...formData,
        productImages: fileUrls, // Save URLs of uploaded images
      };
      console.log('Submitting product data:', productData);
      // const response = await axios.post(
      //   'https://fdiamond-api.azurewebsites.net/api/Product',
      //   productData
      // );
      // console.log('API response:', response.data);

      // Gửi dữ liệu lên server hoặc xử lý dữ liệu tại đây
    } catch (error) {
      console.error('Error uploading files or submitting product data:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
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
              {/* <Grid item md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Sub category</InputLabel>
                  <OutlinedInput
                    value={formData.subCategoryId}
                    onChange={handleInputChange}
                    label="Sub category ID"
                    name="subCategoryId"
                  />
                </FormControl>
              </Grid> */}
              {/* <Grid item md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Variant Values</InputLabel>
                  <OutlinedInput
                    value={formData.productVariantValues}
                    onChange={handleInputChange}
                    label="Variant Values"
                    name="productVariantValues"
                  />
                </FormControl>
              </Grid> */}
              <Grid item md={8}>
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

              <Grid item xs={4}>
                <FormControl fullWidth required>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    label="Price"
                    name="basePrice"
                    type="number"
                  />
                </FormControl>
              </Grid>
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
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <AddMutipleFile onImageSelect={handleImageSelect} />
                </FormControl>
              </Grid>
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
                    Cancel
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
    </Container>
  );
}
