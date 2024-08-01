import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

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
            <MenuItem value="Gemstone">Gemstone</MenuItem>
            <MenuItem value="Pearl">Pearl</MenuItem>
            <MenuItem value="Halo">Halo</MenuItem>
            <MenuItem value="Cross">Cross</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Metal</InputLabel>
          {/* <OutlinedInput
            value={formData.NecklaceMetal}
            onChange={handleInputChange}
            label="Metal"
            name="NecklaceMetal"
          /> */}
          <Select
            value={formData.NecklaceMetal}
            onChange={handleInputChange}
            label="Metal"
            name="NecklaceMetal"
          >
            <MenuItem value="14k White Gold">14k White Gold</MenuItem>
            <MenuItem value="18k White Gold">18k White Gold</MenuItem>
            <MenuItem value="14k Yellow Gold">14k Yellow Gold</MenuItem>
            <MenuItem value="18k Yellow Gold">18k Yellow Gold</MenuItem>
            <MenuItem value="14k Rose Gold">14k Rose Gold</MenuItem>
            <MenuItem value="18k Rose Gold">18k Rose Gold</MenuItem>
            <MenuItem value="Platinum">Platinum</MenuItem>
          </Select>
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
