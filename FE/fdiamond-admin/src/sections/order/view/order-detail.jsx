import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Stack,
  Table,
  Paper,
  Button,
  TableRow,
  TableCell,
  Container,
  TableBody,
  Typography,

  //   TableContainer,
} from '@mui/material';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

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

  const updateOrderStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Order/UpdateStatus/${orderId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        setOrderData((prevData) => ({
          ...prevData,
          status: newStatus,
        }));
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const handleCompletedClick = () => {
    if (orderData.status !== 'Ordered') {
      alert('Only orders with the status "Ordered" can be marked as "Completed"');
      return;
    }
    updateOrderStatus('Completed');
  };

  const { paymentInfo } = orderData;
  return (
    <Container>
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
