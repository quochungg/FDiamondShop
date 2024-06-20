import dayjs from 'dayjs';
import { React } from 'react';
import PropTypes from 'prop-types';

// Import adapter ngày tháng (dayjs trong trường hợp này)

import localizedFormat from 'dayjs/plugin/localizedFormat';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Grid,
  Modal,
  Button,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import localizationEn from '@mui/x-date-pickers/AdapterDayjs/locale/en';

dayjs.extend(localizedFormat); // Kích hoạt plugin cho dayjs

export default function AddVoucherModal({ open, handleClose, voucher, setVoucher, handleSubmit }) {
  // const [startingDate, setStartingDate] = useState(dayjs(voucher.startingDate));
  // const [endDate, setEndDate] = useState(dayjs(voucher.endDate));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleDateChange = (name) => (date) => {
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: date,
    }));
  };

  const handleTimeChange = (name) => (time) => {
    setVoucher((prevVoucher) => {
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

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setVoucher({ ...voucher, [name]: checked });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(voucher);
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
            value={voucher.discountCodeName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Percent"
            name="discountPercent"
            value={voucher.discountPercent}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <MobileTimePicker
                  label="Start Time"
                  ampm={false}
                  inputFormat="HH:mm"
                  value={voucher.startingDate}
                  onChange={handleTimeChange('startingDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={voucher.startingDate}
                  onChange={handleDateChange('startingDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>

              <Grid item xs={6}>
                <MobileTimePicker
                  label="End Time"
                  value={voucher.endDate}
                  ampm={false}
                  inputFormat="HH:mm"
                  onChange={handleTimeChange('endDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={voucher.endDate}
                  onChange={handleDateChange('endDate')}
                  slots={{ textField: (params) => <TextField {...params} sx={{ mb: 1 }} /> }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Switch
                    checked={voucher.isExpried}
                    onChange={handleSwitchChange}
                    name="active"
                    color="primary"
                  />
                }
                label="Active"
                sx={{ mb: 1 }}
              />
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
  voucher: PropTypes.object.isRequired,
  setVoucher: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
