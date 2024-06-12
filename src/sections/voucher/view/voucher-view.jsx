import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  TableRow,
  Container,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/table-no-data';
import TableEmptyRows from 'src/sections/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from 'src/sections/utils';

import VoucherTableRow from '../voucher-table-row';
import VoucherTableHead from '../voucher-table-head';
import VoucherTableToolbar from '../voucher-table-toolbar';

export default function VoucherPage() {
  const [page, setPage] = useState(0);

  const [data, setData] = useState([]);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterById, setFilterById] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterById,
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get('https://fdiamond-api.azurewebsites.net/api/Discount');
        console.log('API Response:', response.data); // Log phản hồi để kiểm tra cấu trúc
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

  const handleSort = (event, productId) => {
    const isAsc = orderBy === productId && order === 'asc';
    if (productId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(productId);
    }
  };

  const handleFilterByID = (event) => {
    setPage(0);
    setFilterById(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const notFound = !dataFiltered.length && !!filterById;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Vouchers</Typography>

        <Button
          // onClick={handleClickAdd}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Voucher
        </Button>
      </Stack>

      <Card>
        <VoucherTableToolbar filterById={filterById} onFilterById={handleFilterByID} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <VoucherTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'discountId', label: 'Code' },
                  { id: 'discountCodeName', label: 'Name' },
                  { id: 'discountPercent', label: 'Percent' },
                  { id: 'startingDate', label: 'Start' },
                  { id: 'endDate', label: 'End' },
                  { id: 'isExpried', label: 'Expired' },
                  { id: '' },
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
                    <VoucherTableRow
                      key={row.discountId}
                      discountId={row.discountId}
                      discountCodeName={row.discountCodeName}
                      discountPercent={row.discountPercent}
                      startingDate={row.startingDate}
                      endDate={row.endDate}
                      isExpried={row.isExpried}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />
                {notFound && <TableNoData query={filterById} />}
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
