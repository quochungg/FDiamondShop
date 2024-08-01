import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

function RingForm({ formData, handleInputChange }) {
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
                        <MenuItem value="Solitaire">Solitaire</MenuItem>
                        <MenuItem value="Halo">Halo</MenuItem>
                        <MenuItem value="Vintage">Vintage</MenuItem>
                        <MenuItem value="Sidestone">Sidestone</MenuItem>
                        <MenuItem value="Three-Stone">Three-Stone</MenuItem>
                        <MenuItem value="Two-Stone">Two-Stone</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={6}>
                <FormControl fullWidth required>
                    <InputLabel>Width</InputLabel>
                    <OutlinedInput
                        value={formData.Width}
                        onChange={handleInputChange}
                        label="Width"
                        name="Width"
                    />
                </FormControl>
            </Grid>
            <Grid item md={6}>
                <FormControl fullWidth required>
                    <InputLabel>Metal</InputLabel>
                    {/* <OutlinedInput
            value={formData.RingMetal}
            onChange={handleInputChange}
            label="Metal"
            name="RingMetal"
          /> */}
                    <Select
                        value={formData.RingMetal}
                        onChange={handleInputChange}
                        label="Metal"
                        name="RingMetal"
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
            {/* Add more fields specific to Ring */}
        </>
    );
}

RingForm.propTypes = {
    formData: PropTypes.shape({
        subCategoryName: PropTypes.string,
        Width: PropTypes.string,
        RingMetal: PropTypes.string,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default RingForm;
