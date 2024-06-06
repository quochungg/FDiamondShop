import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

function NecklaceForm({ formData, handleInputChange }) {
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
            <MenuItem value="Solitaire">Solitaire</MenuItem>
            <MenuItem value="Trilogy">Trilogy</MenuItem>
            <MenuItem value="Halo">Halo</MenuItem>
            <MenuItem value="Cross">Cross</MenuItem>
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

NecklaceForm.propTypes = {
  formData: PropTypes.shape({
    subcatgory_name: PropTypes.string,
    Metal: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default NecklaceForm;
