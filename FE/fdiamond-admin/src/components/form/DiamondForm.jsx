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
            value={formData.subCategoryName}
            onChange={handleInputChange}
            label="Shape"
            name="subCategoryName"
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
          {/* <OutlinedInput
            value={formData.Color}
            onChange={handleInputChange}
            label="Color"
            name="Color"
          /> */}
          <Select value={formData.Color} onChange={handleInputChange} label="Color" name="Color">
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="F">F</MenuItem>
            <MenuItem value="G">G</MenuItem>
            <MenuItem value="H">H</MenuItem>
            <MenuItem value="I">I</MenuItem>
            <MenuItem value="J">J</MenuItem>
            <MenuItem value="K">K</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Clarity</InputLabel>
          {/* <OutlinedInput
            value={formData.clarity}
            onChange={handleInputChange}
            label="Clarity"
            name="clarity"
          /> */}
          <Select
            value={formData.clarity}
            onChange={handleInputChange}
            label="Clarity"
            name="clarity"
          >
            <MenuItem value="FL">FL</MenuItem>
            <MenuItem value="IF">IF</MenuItem>
            <MenuItem value="VVS1">VVS1</MenuItem>
            <MenuItem value="VVS2">VVS2</MenuItem>
            <MenuItem value="VS1">VS1</MenuItem>
            <MenuItem value="VS2">VS2</MenuItem>
            <MenuItem value="SI1">SI1</MenuItem>
            <MenuItem value="SI2">SI2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth required>
          <InputLabel>Cut</InputLabel>
          {/* <OutlinedInput value={formData.Cut} onChange={handleInputChange} label="Cut" name="Cut" /> */}
          <Select value={formData.Cut} onChange={handleInputChange} label="Cut" name="Cut">
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Very Good">Very Good</MenuItem>
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Ideal">Ideal</MenuItem>
            <MenuItem value="Astor ideal">Astor ideal</MenuItem>
          </Select>
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
          {/* <OutlinedInput
            value={formData.Florescence}
            onChange={handleInputChange}
            label="Florescence"
            name="Florescence"
          /> */}
          <Select
            value={formData.Florescence}
            onChange={handleInputChange}
            label="Florescence"
            name="Florescence"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Faint">Faint</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Strong">Strong</MenuItem>
          </Select>
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
    subCategoryName: PropTypes.string,
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
