import axios from 'axios';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Grid,
  Modal,
  Alert,
  Button,
  Snackbar,
  TextField,
  Container,
  AlertTitle,
  Typography,
} from '@mui/material';

dayjs.extend(localizedFormat);

export default function EditVoucherModal({ open, handleClose, voucher, setVoucher, handleSubmit }) {
  const [localVoucher, setLocalVoucher] = useState({
    discountId: '',
    discountCodeName: '',
    discountPercent: '',
    startingDate: null,
    endDate: null,
    isExpried: false,
  });

  const [ErrSnackbar, setErrSnackbar] = useState(false);

  const [errors, setErrors] = useState({
    discountPercent: '',
    endDate: '',
  });

  useEffect(() => {
    if (voucher) {
      setLocalVoucher({
        ...voucher,
        startingDate: voucher.startingDate ? dayjs(voucher.startingDate) : null,
        endDate: voucher.endDate ? dayjs(voucher.endDate) : null,
      });
    }
  }, [voucher]);

  useEffect(() => {
    if (localVoucher.startingDate && localVoucher.endDate) {
      const now = dayjs();
      const isExpried =
        now.isAfter(localVoucher.endDate) || now.isBefore(localVoucher.startingDate);
      setLocalVoucher((prevVoucher) => ({
        ...prevVoucher,
        isExpried,
      }));
    }
  }, [localVoucher.startingDate, localVoucher.endDate]);

  const handleCloseSnackbar = () => {
    setErrSnackbar(false);
  };

  const handleChange = (field, value) => {
    setLocalVoucher({ ...localVoucher, [field]: value });
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handleDateChange = (name) => (date) => {
    setLocalVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: date,
    }));
  };

  const handleTimeChange = (name) => (time) => {
    setLocalVoucher((prevVoucher) => {
      const currentDate = prevVoucher[name];
      if (currentDate) {
        return {
          ...prevVoucher,
          [name]: currentDate.set('hour', time.hour()).set('minute', time.minute()),
        };
      }
      return prevVoucher;
    });
  };

  // const handleSwitchChange = (event) => {
  //   const { name, checked } = event.target;
  //   setLocalVoucher({ ...localVoucher, [name]: checked });
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (localVoucher.discountPercent < 0 || localVoucher.discountPercent > 100) {
      validationErrors.discountPercent =
        '* Percent cannot be negative  and cannot be greater than 100!';
    }

    if (localVoucher.endDate.isBefore(localVoucher.startingDate)) {
      validationErrors.endDate = '* The end date cannot occur before the start date!';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Gửi yêu cầu cập nhật đến API
      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Discount/${localVoucher.discountId}`,
        {
          ...localVoucher,
          startingDate: localVoucher.startingDate
            ? localVoucher.startingDate.format('YYYY-MM-DDTHH:mm')
            : null,
          endDate: localVoucher.endDate ? localVoucher.endDate.format('YYYY-MM-DDTHH:mm') : null,
        }
      );
      console.log('API Response:', response);
      if (response.status === 204) {
        handleSubmit(localVoucher); // Update the voucher state in the parent component
        setVoucher(localVoucher);
      } else {
        console.error(
          'Failed to update voucher:',
          response.data.message || 'Unexpected response structure'
        );
        setErrSnackbar(true);
      }
    } catch (error) {
      console.error('Error updating voucher:', error);
      setErrors({
        serverError: error.response.data,
      });
      setErrSnackbar(true);
    }
  };

  return (
    <Container>
      <Snackbar
        open={ErrSnackbar}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Edit Voucher
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="discountCodeName"
              value={localVoucher.discountCodeName}
              onChange={(e) => handleChange('discountCodeName', e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Percent"
              name="discountPercent"
              type="number"
              value={localVoucher.discountPercent}
              onChange={(e) => handleChange('discountPercent', e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            {errors.discountPercent && (
              <Typography variant="caption" color="error">
                {errors.discountPercent}
              </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} sx={{ mb: 2, mt: 0 }}>
                <Grid item xs={6}>
                  <MobileTimePicker
                    label="Start Time"
                    value={localVoucher.startingDate}
                    ampm={false}
                    inputFormat="HH:mm"
                    onChange={handleTimeChange('startingDate')}
                    slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={localVoucher.startingDate}
                    onChange={handleDateChange('startingDate')}
                    slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <MobileTimePicker
                    label="End Time"
                    value={localVoucher.endDate}
                    ampm={false}
                    inputFormat="HH:mm"
                    onChange={handleTimeChange('endDate')}
                    slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={localVoucher.endDate}
                    onChange={handleDateChange('endDate')}
                    slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                  />
                </Grid>
                {errors.endDate && (
                  <Typography variant="caption" color="error">
                    {errors.endDate}
                  </Typography>
                )}
              </Grid>
            </LocalizationProvider>
            {/* <FormControlLabel
            control={
              <Switch
                checked={localVoucher.isExpried}
                onChange={handleSwitchChange}
                name="isExpried"
                color="primary"
              />
            }
            label="Active"
            sx={{ mb: 2 }}
          /> */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" onClick={handleClose} fullWidth>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" type="submit" fullWidth>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Container>
  );
}

EditVoucherModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  voucher: PropTypes.object.isRequired,
  setVoucher: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
