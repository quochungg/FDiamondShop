import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SortProductList = ({ handleSearchParams }) => {

    const handleSelectChange = (e) => {
        const selectedValue = JSON.parse(e.target.value);
        handleSearchParams(selectedValue);
    }

    const divStyle = {
        color: 'white',
        fontSize: '17px',
        fontWeight: 'semibold',
        fontFamily: 'gantari',
    };


    return (
        <>
            <div className="flex flex-row items-center">

                <Box sx={{ width: 250 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" style={divStyle}>Sort By</InputLabel>
                        <Select
                            defaultValue={JSON.stringify({ OrderBy: 'ProductName', SortBy: 'asc' })}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sort By"
                            onChange={handleSelectChange}
                            sx={{
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                "&:hover": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white'
                                    }
                                },
                                fontFamily: 'gantari',
                                fontSize: '17px',
                                height: '60px',
                            }}
                        >
                            <MenuItem value={JSON.stringify({ OrderBy: 'ProductName', SortBy: 'asc' })}>Alphabetical A-Z (Default)</MenuItem>
                            <MenuItem value={JSON.stringify({ OrderBy: 'ProductName', SortBy: 'desc' })}>Alphabetical Z-A</MenuItem>
                            <MenuItem value={JSON.stringify({ OrderBy: 'BasePrice', SortBy: 'asc' })}>Low to High</MenuItem>
                            <MenuItem value={JSON.stringify({ OrderBy: 'BasePrice', SortBy: 'desc' })}>High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </div>
        </>
    )
};

export default SortProductList;
