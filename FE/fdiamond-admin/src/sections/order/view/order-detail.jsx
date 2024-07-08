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
  Button,
  Snackbar,
  TableRow,
  TableCell,
  Container,
  TableBody,
  Typography,
  AlertTitle,

  //   TableContainer,
} from '@mui/material';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
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
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderData) {
    return <Typography>Loading...</Typography>;
  }

  const handleBack = () => {
    navigate('/order');
  };
  const updateOrderStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Order/UpdateStatus/${orderId}`,
        { status: newStatus }
      );
      if (response.status === 204) {
        setOrderData((prevData) => ({
          ...prevData,
          status: newStatus,
        }));
        navigate('/order', { state: { showSnackbar: true } });
      } else {
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setOpenSnackbar(true);
    }
  };

  const handleCompletedClick = () => {
    // if (orderData.status !== 'Ordered') {
    //   alert('Only orders with the status "Ordered" can be marked as "Completed"');
    //   return;
    // }
    updateOrderStatus('Completed');
  };

  const { paymentInfo } = orderData;
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
        <Grid item xs={12} md={6} lg={8}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Detail
              </Typography>
              <Table>
                <TableBody>
                  {orderData.cartLines.map((cartLine) =>
                    cartLine.cartLineItems.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>
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
                        <TableCell>
                          <Typography variant="subtitle2">{item.product.productName}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            #{item.product.productId}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Information
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
                  onClick={handleCompletedClick}
                  style={{ marginTop: '20px' }}
                >
                  Complete Order
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
