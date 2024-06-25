import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Box, Container, TextField, Typography } from '@mui/material';

const AddImageForm = ({ onImageSelect }) => {
  // Không cần biến image nếu không sử dụng
  // const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    // setImage(selectedImage); // Xóa dòng này nếu không cần sử dụng biến image

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
      onImageSelect(selectedImage); // Pass the selected image to the parent component
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" sx={{ mb: 3 }}>
        Add Image
      </Typography>
      <TextField
        type="file"
        label="Choose Image"
        InputLabelProps={{ shrink: true }}
        onChange={handleImageChange}
        fullWidth
        variant="outlined"
        margin="normal"
        inputProps={{ accept: 'image/*' }}
      />
      {imagePreview && (
        <Box mt={2}>
          <Typography variant="h6">Image Preview:</Typography>
          <img src={imagePreview} alt="Selected" style={{ width: '100%', height: 'auto' }} />
        </Box>
      )}
    </Container>
  );
};

AddImageForm.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
};

export default AddImageForm;
