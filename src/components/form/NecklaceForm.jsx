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
            value={formData.subCategoryName}
            onChange={handleInputChange}
            label="Shape"
            name="subCategoryName"
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
            value={formData.NecklaceMetal}
            onChange={handleInputChange}
            label="Metal"
            name="NecklaceMetal"
          />
        </FormControl>
      </Grid>
    </>
  );
}

NecklaceForm.propTypes = {
  formData: PropTypes.shape({
    subCategoryName: PropTypes.string,
    NecklaceMetal: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default NecklaceForm;
