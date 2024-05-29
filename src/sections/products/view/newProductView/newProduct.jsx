import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
// import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
// import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function NewProductView() {
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'black',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  const category = [
    { value: 'diamond', label: 'Diamond' },
    { value: 'ring', label: 'Ring' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'earring', label: 'Earring' },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Add new product
      </Typography>
      <form>
        <Card>
          <CardHeader title="Product information" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    defaultValue="diamond"
                    label="Category"
                    name="category"
                    variant="outlined"
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={8}>
                <FormControl fullWidth required>
                  <InputLabel>Product name</InputLabel>
                  <OutlinedInput label="Product Name" name="name" />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth required>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput label="Price" name="price" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <TextField label="Description" name="description" variant="outlined" />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
