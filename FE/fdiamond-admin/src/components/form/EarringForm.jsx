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
          <OutlinedInput
            value={formData.EarringMetal}
            onChange={handleInputChange}
            label="Metal"
            name="EarringMetal"
          />
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
