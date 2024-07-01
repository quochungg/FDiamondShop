import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';

// Import adapter ngày tháng (dayjs trong trường hợp này)

import localizedFormat from 'dayjs/plugin/localizedFormat';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Grid, Modal, Button, TextField, Typography } from '@mui/material';
import { DatePicker, MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import localizationEn from '@mui/x-date-pickers/AdapterDayjs/locale/en';

dayjs.extend(localizedFormat); // Kích hoạt plugin cho dayjs

export default function AddVoucherModal({ open, handleClose, handleSubmit }) {
  // const [startingDate, setStartingDate] = useState(dayjs(voucher.startingDate));
  // const [endDate, setEndDate] = useState(dayjs(voucher.endDate));
  const [newVoucher, setNewVoucher] = useState({
    discountCodeName: '',
    discountPercent: '',
    startingDate: dayjs(),
    endDate: dayjs(),
    isExpried: false,
  });

  const [errors, setErrors] = useState({
    discountPercent: '',
    endDate: '',
  });

  useEffect(() => {
    const now = dayjs();
    const isExpried =
      newVoucher.startingDate && newVoucher.endDate
        ? now.isBefore(newVoucher.startingDate) || now.isAfter(newVoucher.endDate)
        : false;

    setNewVoucher((prevVoucher) => ({ ...prevVoucher, isExpried }));
  }, [newVoucher.startingDate, newVoucher.endDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVoucher({ ...newVoucher, [name]: value });
    if (name === 'discountPercent' || name === 'endDate') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleDateChange = (name) => (date) => {
    setNewVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: date,
    }));
  };

  const handleTimeChange = (name) => (time) => {
    setNewVoucher((prevVoucher) => {
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
  //   setVoucher({ ...voucher, [name]: checked });
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (newVoucher.discountPercent < 0 || newVoucher.discountPercent > 100) {
      validationErrors.discountPercent =
        '* Percent cannot be negative and cannot be greater than 100!';
    }

    if (newVoucher.endDate.isBefore(newVoucher.startingDate)) {
      validationErrors.endDate = '* The end date cannot occur before the start date!';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleSubmit({
      ...newVoucher,
      startingDate: newVoucher.startingDate
        ? newVoucher.startingDate.format('YYYY-MM-DDTHH:mm')
        : null,
      endDate: newVoucher.endDate ? newVoucher.endDate.format('YYYY-MM-DDTHH:mm') : null,
    });
  };

  return (
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
          width: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Add New Voucher
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="discountCodeName"
            value={newVoucher.discountCodeName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Percent"
            name="discountPercent"
            type="number"
            value={newVoucher.discountPercent}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {errors.discountPercent && (
            <Typography variant="caption" color="error">
              {errors.discountPercent}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ mb: 1, mt: 0 }}>
              <Grid item xs={6}>
                <MobileTimePicker
                  label="Start Time"
                  ampm={false}
                  inputFormat="HH:mm"
                  value={newVoucher.startingDate}
                  onChange={handleTimeChange('startingDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={newVoucher.startingDate}
                  onChange={handleDateChange('startingDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>

              <Grid item xs={6}>
                <MobileTimePicker
                  label="End Time"
                  value={newVoucher.endDate}
                  ampm={false}
                  inputFormat="HH:mm"
                  onChange={handleTimeChange('endDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={newVoucher.endDate}
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
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={8}>
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={voucher.isExpried}
                    onChange={handleSwitchChange}
                    name="isExpried"
                    color="primary"
                  />
                }
                label="Active"
                sx={{ mb: 1 }}
              /> */}
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" fullWidth>
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

AddVoucherModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
