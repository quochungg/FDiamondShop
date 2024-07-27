import axios from 'axios';
import { useLocation } from 'react-router';
import React, { useState, useEffect, useContext } from 'react';

import {
  Card,
  Stack,
  Table,
  Alert,
  TableRow,
  Snackbar,
  TableBody,
  Container,
  TableCell,
  AlertTitle,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { AccountContext } from 'src/_mock/AccountContext';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/table-no-data';
import { applyFilter, getComparator } from 'src/sections/utils';

import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import OrderTableToolbar from '../order-table-toolbar';

export default function OderStaffPage() {
  const { account } = useContext(AccountContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const location = useLocation();

  const [page, setPage] = useState(0);

  const [filterByOrderId, setFilterByOrderId] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('desc');

  const [orderBy, setOrderBy] = useState('orderDate');

  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.state && location.state.showSnackbar) {
      setOpenSnackbar(true);
      // Clear the state to avoid showing Snackbar again if the user navigates back to this page
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterByOrderId,
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(
          `https://fdiamond-api.azurewebsites.net/api/Order/GetAllOrderForOrderManagementStaff?id=${account.UserID}`
        );
        // console.log('API Response:', response.data); // Log phản hồi để kiểm tra cấu trúc
        console.log(account.UserID);
        if (response.data && Array.isArray(response.data.result)) {
          const Orders = response.data.result.filter((od) => od.status !== 'Failed');
          setData(Orders);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAll();
  }, [account.UserID]);

  const handleFilterByID = (event) => {
    setPage(0);
    setFilterByOrderId(event.target.value);
  };

  const handleSort = (event, orderId) => {
    const isAsc = orderBy === orderId && order === 'asc';
    if (orderId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(orderId);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalOrders = data.length;
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalOrders);
  const emptyRowsCount = endIndex < rowsPerPage ? rowsPerPage - (endIndex - startIndex) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const notFound = !dataFiltered.length && !!filterByOrderId;

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          Order is completed
        </Alert>
      </Snackbar>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Orders</Typography>
      </Stack>

      <Card>
        <OrderTableToolbar filterByOrderId={filterByOrderId} onFilterByOrderId={handleFilterByID} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'orderId', label: 'Order' },
                  { id: 'orderDate', label: 'Date' },
                  { id: 'totalPrice', label: 'Total Price' },
                  { id: 'paymentMethod', label: 'Payment Method' },
                  { id: 'status', label: 'Status' },
                  { id: '', label: 'Detail', align: 'right' },
                ]}
              />
              <TableBody>
                {dataFiltered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
                {dataFiltered.slice(startIndex, endIndex).map((row) => (
                  <OrderTableRow
                    key={row.orderId}
                    orderId={row.orderId}
                    orderDate={row.orderDate}
                    totalPrice={row.totalPrice}
                    paymentMethod={row.paymentInfo?.paymentMethod}
                    status={row.status}
                  />
                ))}
                {emptyRowsCount > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsCount }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}

                {notFound && <TableNoData query={filterByOrderId} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={totalOrders}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
