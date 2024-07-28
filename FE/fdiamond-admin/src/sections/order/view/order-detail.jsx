import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import {
  Box,
  Grid,
  Stack,
  Table,
  Paper,
  Alert,
  Select,
  Button,
  MenuItem,
  Snackbar,
  TableRow,
  TableCell,
  Container,
  TableBody,
  Typography,
  AlertTitle,
  InputLabel,
  FormControl,

  //   TableContainer,
} from '@mui/material';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://fdiamond-api.azurewebsites.net/api/Order/GetOrderDetails?orderId=${orderId}`
        );
        setOrderData(response.data.result);
        console.log(response);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const fetchStaffList = async () => {
      try {
        const response = await axios.get(
          `https://fdiamond-api.azurewebsites.net/api/Delivery/GetOrdermanagementStaff`
        );
        console.log(response);
        setStaffList(response.data.result);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchOrderDetails();
    fetchStaffList();
  }, [orderId]);

  if (!orderData) {
    return <Typography>Loading...</Typography>;
  }

  const handleBack = () => {
    navigate('/order');
  };
  const handleAssignClick = async (newStatus) => {
    try {
      const response = await axios.post(
        `https://fdiamond-api.azurewebsites.net/api/Order/AssignToOrderManagementStaff`,
        {
          orderId,
          userId: selectedStaff,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setOrderData((prevData) => ({
          ...prevData,
          status: 'Assigned',
        }));
        navigate('/order', { state: { showSnackbar: true } });
      } else {
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error assigning order:', error);
      setOpenSnackbar(true);
    }
  };

  const { paymentInfo, deliveryDetail } = orderData;
  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>Error</AlertTitle>
          Error
        </Alert>
      </Snackbar>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Order Detail</Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Order Detail
              </Typography>
              <Table>
                <TableBody>
                  {orderData.cartLines.map((cartLine) =>
                    cartLine.cartLineItems.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell align="center" variant="head">
                          <img
                            src={item.product.productImages[0].imageUrl}
                            alt={item.product.productName}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                          />
                        </TableCell>
                        <TableCell variant="head">
                          <Typography variant="subtitle1">{item.product.productName}</Typography>
                          <Typography variant="body1" color="textSecondary">
                            #{item.product.productId}
                          </Typography>
                        </TableCell>
                        <TableCell align="left" variant="head">
                          ${item.price}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Order Information
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Order ID</TableCell>
                    <TableCell>{orderData.orderId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Order Date</TableCell>
                    <TableCell>{dayjs(orderData.orderDate).format('DD/MM/YYYY HH:mm')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Base Price</TableCell>
                    <TableCell>{orderData.basePrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Total Price</TableCell>
                    <TableCell>{orderData.totalPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Payment Method</TableCell>
                    <TableCell>{paymentInfo ? paymentInfo.paymentMethod : 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Discount Percent</TableCell>
                    <TableCell>{orderData.discountCode?.discountPercent || '0'}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Status</TableCell>
                    <TableCell>{orderData.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Delivery Infomation
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Delivery Detail ID</TableCell>
                    <TableCell>{deliveryDetail.deliveryDetailId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Address</TableCell>
                    <TableCell>{deliveryDetail.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Phone</TableCell>
                    <TableCell>{deliveryDetail.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Note</TableCell>
                    <TableCell>{deliveryDetail.note || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Recipient</TableCell>
                    <TableCell>
                      {deliveryDetail.firstName} {deliveryDetail.lastName}
                    </TableCell>
                  </TableRow>
                  {orderData.status === 'Idle' && (
                    <TableRow>
                      <TableCell component="th">Fail Reason</TableCell>
                      <TableCell>
                        {deliveryDetail.failReason ||
                          'The customer is not present at the delivery address'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {orderData.status === 'Ordered' && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Assign to Staff</InputLabel>
                  <Select
                    value={selectedStaff}
                    label="Assign to Staff"
                    onChange={(e) => setSelectedStaff(e.target.value)}
                  >
                    {staffList.map((staff) => (
                      <MenuItem key={staff.userId} value={staff.userId}>
                        {staff.firstName} {staff.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Button
                variant="outlined"
                color="success"
                onClick={handleBack}
                sx={{ mr: 2, marginTop: '20px' }}
              >
                Back
              </Button>
              {orderData.status === 'Ordered' && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAssignClick}
                  style={{ marginTop: '20px' }}
                >
                  Assign
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
