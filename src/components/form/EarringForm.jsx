import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

function EarringForm({ formData, handleInputChange }) {
  return (
    <>
      <Grid item md={8}>
        <FormControl fullWidth required>
          <InputLabel>Shape</InputLabel>
          <Select
            value={formData.subcatgory_name}
            onChange={handleInputChange}
            label="Shape"
            name="subcatgory_name"
          >
            <MenuItem value="Hoop">Hoop</MenuItem>
            <MenuItem value="Trilogy">Trilogy</MenuItem>
            <MenuItem value="Drop">Drop</MenuItem>
            <MenuItem value="Stud">Stud</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4}>
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
    </>
  );
}

EarringForm.propTypes = {
  formData: PropTypes.shape({
    subcatgory_name: PropTypes.string,
    Metal: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default EarringForm;
