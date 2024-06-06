import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

function DiamondForm({ formData, handleInputChange }) {
  return (
    <>
      <Grid item md={6}>
        <FormControl fullWidth required>
          <InputLabel>Shape</InputLabel>
          <Select
            value={formData.subcatgory_name}
            onChange={handleInputChange}
            label="Shape"
            name="subcatgory_name"
          >
            <MenuItem value="Round">Round</MenuItem>
            <MenuItem value="Princess">Princess</MenuItem>
            <MenuItem value="Emerald">Emerald</MenuItem>
            <MenuItem value="Cushion">Cushion</MenuItem>
            <MenuItem value="Marquise">Marquise</MenuItem>
            <MenuItem value="Radiant">Radiant</MenuItem>
            <MenuItem value="Oval">Oval</MenuItem>
            <MenuItem value="Pearl">Pearl</MenuItem>
            <MenuItem value="Heart">Heart</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth required>
          <InputLabel>Color</InputLabel>
          <OutlinedInput
            value={formData.Color}
            onChange={handleInputChange}
            label="Color"
            name="Color"
          />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Clarity</InputLabel>
          <OutlinedInput
            value={formData.clarity}
            onChange={handleInputChange}
            label="Clarity"
            name="clarity"
          />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Cut</InputLabel>
          <OutlinedInput value={formData.Cut} onChange={handleInputChange} label="Cut" name="Cut" />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Carat Weight</InputLabel>
          <OutlinedInput
            value={formData.CaratWeight}
            onChange={handleInputChange}
            label="Carat Weight"
            name="CaratWeight"
          />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Florescence</InputLabel>
          <OutlinedInput
            value={formData.Florescence}
            onChange={handleInputChange}
            label="Florescence"
            name="Florescence"
          />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Length</InputLabel>
          <OutlinedInput
            value={formData.Length}
            onChange={handleInputChange}
            label="Length"
            name="Length"
          />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Depth</InputLabel>
          <OutlinedInput
            value={formData.Depth}
            onChange={handleInputChange}
            label="Depth"
            name="Depth"
          />
        </FormControl>
      </Grid>
      {/* Add more fields specific to Diamond */}
    </>
  );
}

DiamondForm.propTypes = {
  formData: PropTypes.shape({
    subcatgory_name: PropTypes.string,
    Color: PropTypes.string,
    clarity: PropTypes.string,
    Cut: PropTypes.string,
    CaratWeight: PropTypes.string,
    Florescence: PropTypes.string,
    Length: PropTypes.string,
    Depth: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default DiamondForm;
