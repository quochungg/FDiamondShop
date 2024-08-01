import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function EarringForm({ formData, handleInputChange }) {
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
            <MenuItem value="Hoop">Hoop</MenuItem>
            <MenuItem value="Gemstone">Gemstone</MenuItem>
            <MenuItem value="Drop">Drop</MenuItem>
            <MenuItem value="Stud">Stud</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Metal</InputLabel>
          {/* <OutlinedInput
            value={formData.EarringMetal}
            onChange={handleInputChange}
            label="Metal"
            name="EarringMetal"
          /> */}
          <Select
            value={formData.EarringMetal}
            onChange={handleInputChange}
            label="Metal"
            name="EarringMetal"
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

EarringForm.propTypes = {
  formData: PropTypes.shape({
    subCategoryName: PropTypes.string,
    EarringMetal: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default EarringForm;
