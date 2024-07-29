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
  Dialog,
  Button,
  TableRow,
  TableCell,
  Container,
  TextField,
  TableBody,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default function DeliveryOrderDetail() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isIdleDialogOpen, setIsIdleDialogOpen] = useState(false);
  const [idleFailReason, setIdleFailReason] = useState('');
  const navigate = useNavigate();

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

    fetchOrderDetails();
  }, [orderId]);

  if (!orderData) {
    return <Typography>Loading...</Typography>;
  }

  const handleBack = () => {
    navigate('/order-delivery');
  };

  const handleStatusChange = async (status, failReason) => {
    try {
      const response = await axios.put(
        `https://fdiamond-api.azurewebsites.net/api/Delivery/UpdateOrderStatus`,
        {
          orderId,
          status,
          failReason: status === 'Idle' ? failReason : null,
        }
      );
      console.log(response);
      console.log(orderId, status, failReason);

      if (response.status === 200) {
        setOrderData((prevData) => ({
          ...prevData,
          status,
        }));
        navigate('/order-delivery', { state: { showSnackbar: true } });
      } else {
        // setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error assigning order:', error);
      // setOpenSnackbar(true);
    }
  };

  const handleOpenIdleDialog = () => {
    setIsIdleDialogOpen(true);
  };

  const handleCloseIdleDialog = () => {
    setIsIdleDialogOpen(false);
    setIdleFailReason('');
  };

  const handleConfirmIdle = () => {
    handleStatusChange('Idle', idleFailReason);
    handleCloseIdleDialog();
  };

  const { paymentInfo, deliveryDetail } = orderData;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Order Detail</Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Order Detail
              </Typography>
              <Table>
                <TableBody>
                  {orderData.cartLines.map((cartLine) =>
                    cartLine.cartLineItems.map((item) => (
                      <TableRow key={item.productId} colSpan={2}>
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
                        <TableCell variant="head" align="left">
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
                Order Infomation
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
              {orderData.status === 'Shipping' && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpenIdleDialog}
                    style={{ marginTop: '20px', marginRight: '20px' }}
                  >
                    Idle
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleStatusChange('Delivered')}
                    style={{ marginTop: '20px' }}
                  >
                    Delivered
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={isIdleDialogOpen} onClose={handleCloseIdleDialog}>
        <DialogTitle>Enter Reason for Idle Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for setting this order to idle status.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason"
            fullWidth
            variant="standard"
            value={idleFailReason}
            onChange={(e) => setIdleFailReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIdleDialog}>Cancel</Button>
          <Button onClick={handleConfirmIdle}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
