import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

function RingForm({ formData, handleInputChange }) {
  return (
    <>
      <Grid item md={12}>
        <FormControl fullWidth required>
          <InputLabel>Shape</InputLabel>
          <Select
            value={formData.subcatgory_name}
            onChange={handleInputChange}
            label="Shape"
            name="subcatgory_name"
          >
            <MenuItem value="Solitaire">Solitaire</MenuItem>
            <MenuItem value="Halo">Halo</MenuItem>
            <MenuItem value="Vintage">Vintage</MenuItem>
            <MenuItem value="Sidestone">Sidestone</MenuItem>
            <MenuItem value="Three-stone">Three-stone</MenuItem>
            <MenuItem value="Two-stone">Two-stone</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth required>
          <InputLabel>Size</InputLabel>
          <OutlinedInput
            value={formData.Size}
            onChange={handleInputChange}
            label="Size"
            name="Size"
          />
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth required>
          <InputLabel>Metal</InputLabel>
          <OutlinedInput
            value={formData.Metal}
            onChange={handleInputChange}
            label="Metal"
            name="Metal"
          />
        </FormControl>
      </Grid>
      {/* Add more fields specific to Ring */}
    </>
  );
}

RingForm.propTypes = {
  formData: PropTypes.shape({
    subcatgory_name: PropTypes.string,
    Size: PropTypes.string,
    Metal: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default RingForm;
