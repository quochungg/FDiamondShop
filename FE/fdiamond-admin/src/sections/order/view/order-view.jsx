import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  //   Button,
  TableRow,
  TableBody,
  Container,
  TableCell,
  Typography,
  //   FormControl,
  //   OutlinedInput,
  //   InputAdornment,
  TableContainer,
  TablePagination,
} from '@mui/material';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/table-no-data';
import TableEmptyRows from 'src/sections/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from 'src/sections/utils';

import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import OrderTableToolbar from '../order-table-toolbar';

export default function OderPage() {
  const [page, setPage] = useState(0);

  const [filterByOrderId, setFilterByOrderId] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('desc');

  const [orderBy, setOrderBy] = useState('orderDate');

  const [data, setData] = useState([]);

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterByOrderId,
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(
          'https://fdiamond-api.azurewebsites.net/api/Order/GetAllOrder'
        );
        // console.log('API Response:', response.data); // Log phản hồi để kiểm tra cấu trúc
        if (response.data && Array.isArray(response.data.result)) {
          setData(response.data.result);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAll();
  }, []);

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

  const notFound = !dataFiltered.length && !!filterByOrderId;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Orders</Typography>
        {/* <FormControl>
          <OutlinedInput
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Search OrderID"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  Search
                </Button>
              </InputAdornment>
            }
          />
        </FormControl> */}
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
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrderTableRow
                      key={row.orderId}
                      orderId={row.orderId}
                      orderDate={row.orderDate}
                      totalPrice={row.totalPrice}
                      paymentMethod={row.payment?.paymentMethod}
                      status={row.status}
                    />
                  ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />

                {notFound && <TableNoData query={filterByOrderId} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, value) => setPage(value)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
