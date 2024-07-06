import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Snackbar,
  Container,
  TextField,
  AlertTitle,
  CardHeader,
  Typography,
  InputLabel,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import Iconify from 'src/components/iconify';

export default function AccountProfile() {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://fdiamond-api.azurewebsites.net/api/Users?userId=${userId}`
        );
        if (response && response.data) {
          const userData = response.data.result;
          setFormData({
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address || '',
            phoneNumber: userData.phoneNumber || '',
            password: '',
            newPassword: '',
            confirmPassword: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChangeClick = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = {};

    if (showPasswordFields) {
      const { newPassword, confirmPassword } = formData;
      const NewPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/;
      if (!NewPasswordRegex.test(newPassword)) {
        validationErrors.newPassword = `Password must be at least 6 characters long, include at least one uppercase letter, one digit, and one special character, and must not contain spaces.`;
      }
      if (newPassword && newPassword !== confirmPassword) {
        validationErrors.confirmPassword = 'Confirmation password does not match!';
      }
    }

    const { phoneNumber } = formData;
    const phoneNumberRegex = /^0\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      validationErrors.phoneNumber = `Phone number
            must be 10 digits long, start with 0,
            and contain no spaces.`;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    const firstName = formData.firstName.trim().replace(/\s+/g, ' ');
    if (!nameRegex.test(firstName)) {
      validationErrors.name = 'Name can only contain alphabetic characters.';
    }

    const lastName = formData.lastName.trim().replace(/\s+/g, ' ');
    if (!nameRegex.test(lastName)) {
      validationErrors.name = 'Name can only contain alphabetic characters.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const dataToSend = {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    };

    if (showPasswordFields) {
      if (formData.password) {
        dataToSend.password = formData.password;
      }
      if (formData.newPassword) {
        dataToSend.newPassword = formData.newPassword;
        dataToSend.confirmPassword = formData.confirmPassword;
      }
    }

    try {
      console.log(dataToSend);
      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Users/update`,
        dataToSend
      );

      if (response.status === 204) {
        navigate('/', { state: { showSnackbar: true } });
      } else {
        const errorData = response.data;
        setOpenSnackbar(true);
        // Assuming the server sends an `errorMessages` field with an array of errors
        setErrors({ serverError: errorData.errorMessages.join(', ') });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessages) {
        console.error('Error updating account:', error.response.data);
        setOpenSnackbar(true);
        setErrors({
          serverError: error.response.data.errorMessages.join(', '),
        });
      } else {
        console.error('Error updating account:', error);
        setOpenSnackbar(true);
        setErrors({
          serverError: 'An error occurred during the update. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {errors.serverError && (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            <AlertTitle>Error</AlertTitle>
            {errors.serverError}
          </Alert>
        )}
      </Snackbar>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Update Accouunt" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <InputLabel>User Name</InputLabel>
                  <OutlinedInput
                    disabled
                    value={formData.userName}
                    label="User Name"
                    name="userName"
                  />
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth required>
                  <InputLabel>First Name</InputLabel>
                  <OutlinedInput
                    value={formData.firstName}
                    onChange={handleInputChange}
                    label="First Name"
                    name="firstName"
                    required
                  />
                  {errors.name && (
                    <Typography variant="caption" color="error">
                      {errors.name}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Last Name</InputLabel>
                  <OutlinedInput
                    value={formData.lastName}
                    onChange={handleInputChange}
                    label="Last Name"
                    name="lastName"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Phone Number</InputLabel>
                  <OutlinedInput
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    label="Phone Number"
                    name="phoneNumber"
                    required
                  />
                  {errors.phoneNumber && (
                    <Typography variant="caption" color="error">
                      {errors.phoneNumber}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth required>
                  <InputLabel>Address</InputLabel>
                  <OutlinedInput
                    value={formData.address}
                    onChange={handleInputChange}
                    label="Address"
                    name="address"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <Button variant="contained" color="primary" onClick={handlePasswordChangeClick}>
                  {showPasswordFields ? 'Cancel' : 'Change Password'}
                </Button>
              </Grid>
              {showPasswordFields && (
                <>
                  <Grid item md={4}>
                    <FormControl fullWidth required>
                      <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify
                                  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={4}>
                    <FormControl fullWidth required>
                      <TextField
                        name="newPassword"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                              >
                                <Iconify
                                  icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.newPassword && (
                        <Typography variant="caption" color="error">
                          {errors.newPassword}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={4}>
                    <FormControl fullWidth required>
                      <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                <Iconify
                                  icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.confirmPassword && (
                        <Typography variant="caption" color="error">
                          {errors.confirmPassword}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/')}
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>

                  {/* <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button> */}
                  <LoadingButton
                    size="normal"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
