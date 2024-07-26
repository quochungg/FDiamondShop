import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  Card,
  Grid,
  Select,
  Button,
  MenuItem,
  Container,
  InputLabel,
  CardHeader,
  Typography,
  CardContent,
  FormControl,
  OutlinedInput,
} from '@mui/material';

export default function NewStaffView() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    role: '',
  });
  const navigate = useNavigate();

  const role = [
    { value: 'deliverystaff', label: 'Delivery Staff' },
    { value: 'ordermanagementstaff', label: 'Merchandiser' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        'https://fdiamond-api.azurewebsites.net/api/Users/register',
        formData
      );

      console.log(response.data);
      // Handle success, e.g., navigate to another page or show a success message
      navigate('/staff');
    } catch (error) {
      console.error('There was an error registering the staff!', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Creat Staff Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Account Infomation" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <FormControl fullWidth required>
                  <InputLabel>User Name</InputLabel>
                  <OutlinedInput
                    value={formData.userName}
                    onChange={handleChange}
                    label="User Name"
                    name="userName"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    value={formData.password}
                    onChange={handleChange}
                    label="Password"
                    name="password"
                    type="password"
                  />
                </FormControl>
              </Grid>

              <Grid item md={3}>
                <FormControl fullWidth required>
                  <InputLabel>First Name</InputLabel>
                  <OutlinedInput
                    value={formData.firstName}
                    onChange={handleChange}
                    label="First Name"
                    name="firstName"
                  />
                </FormControl>
              </Grid>

              <Grid item md={3}>
                <FormControl fullWidth required>
                  <InputLabel>Last Name</InputLabel>
                  <OutlinedInput
                    value={formData.lastName}
                    onChange={handleChange}
                    label="Last Name"
                    name="lastName"
                  />
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Phone Number</InputLabel>
                  <OutlinedInput
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    label="Phone Number"
                    name="phoneNumber"
                  />
                </FormControl>
              </Grid>

              <Grid item md={8}>
                <FormControl fullWidth required>
                  <InputLabel>Address</InputLabel>
                  <OutlinedInput
                    value={formData.address}
                    onChange={handleChange}
                    label="Address"
                    name="address"
                  />
                </FormControl>
              </Grid>

              <Grid item md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                    name="role"
                    variant="outlined"
                  >
                    {role.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)}
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
