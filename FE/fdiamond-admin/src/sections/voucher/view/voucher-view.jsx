// import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  Alert,
  Button,
  TableRow,
  Snackbar,
  Container,
  TableBody,
  TableCell,
  AlertTitle,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/table-no-data';
// import TableEmptyRows from 'src/sections/table-empty-rows';
import { applyFilter, getComparator } from 'src/sections/utils';

import AddVoucherModal from '../AddVoucherModal';
import EditVoucherModal from '../EditVoucherModal';
import VoucherTableRow from '../voucher-table-row';
import VoucherTableHead from '../voucher-table-head';
import VoucherTableToolbar from '../voucher-table-toolbar';

export default function VoucherPage() {
  const [page, setPage] = useState(0);

  const [data, setData] = useState([]);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('discountId');

  // const [filterById, setFilterById] = useState('');

  const [filterName, setFilterName] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [ErrSnackbar, setErrSnackbar] = useState(false);

  const [errors, setErrors] = useState({});

  const [currentVoucher, setCurrentVoucher] = useState({
    discountId: '',
    discountCodeName: '',
    discountPercent: '',
    startingDate: null,
    endDate: null,
    isExpried: false,
  });

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // useEffect(() => {
  //   const getAll = async () => {
  //     try {
  //       const response = await axios.get('https://fdiamond-api.azurewebsites.net/api/Discount');
  //       console.log('API Response:', response.data); // Log phản hồi để kiểm tra cấu trúc
  //       if (response.data && Array.isArray(response.data.result)) {
  //         setData(response.data.result);
  //       } else {
  //         console.error('Unexpected API response format:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   getAll();
  // }, []);

  useEffect(() => {
    const updateAndGetAll = async () => {
      try {
        await axios.put('https://fdiamond-api.azurewebsites.net/api/Discount/UpdateAuto');
        console.log('Auto update successfully');

        const response = await axios.get('https://fdiamond-api.azurewebsites.net/api/Discount');
        console.log('API response:', response.data); // Ghi lại phản hồi để kiểm tra cấu trúc
        if (response.data && Array.isArray(response.data.result)) {
          setData(response.data.result);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error update and fetching data:', error);
      }
    };

    updateAndGetAll();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrSnackbar(false);
  };

  const handleSort = (event, discountId) => {
    const isAsc = orderBy === discountId && order === 'asc';
    if (discountId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(discountId);
    }
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenEditModal = (voucher) => {
    setCurrentVoucher(voucher);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditVoucher = (updatedVoucher) => {
    setData(
      data.map((voucher) =>
        voucher.discountId === updatedVoucher.discountId ? updatedVoucher : voucher
      )
    );
    handleCloseEditModal();
    setOpenSnackbar(true);
  };

  const handleSubmit = async (voucher) => {
    try {
      const response = await axios.post('https://fdiamond-api.azurewebsites.net/api/Discount', {
        ...voucher,
        startingDate: voucher.startingDate ? voucher.startingDate : null,
        endDate: voucher.endDate ? voucher.endDate : null,
      });
      console.log(voucher);
      const responseData = response.data;
      if (responseData.isSuccess && responseData.result) {
        setData((prevData) => [...prevData, responseData.result]);
        handleCloseModal();
        setOpenSnackbar(true);
      } else {
        console.error('Invalid response data:', responseData.result);
      }
    } catch (error) {
      console.error('Error adding voucher:', error);
      setErrSnackbar(true);
      setErrors({
        serverError: error.response.data,
      });
    }
  };

  const totalDiscounts = data.length;
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalDiscounts);
  const emptyRowsCount = endIndex < rowsPerPage ? rowsPerPage - (endIndex - startIndex) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const notFound = !dataFiltered.length && !!filterName;
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
          Success submitting discount data!
        </Alert>
      </Snackbar>
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Discount Codes</Typography>

        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Discount Code
        </Button>
      </Stack>

      <Card>
        <VoucherTableToolbar filterName={filterName} onFilterName={handleFilterName} />
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
                  { id: 'isExpried', label: 'Open' },
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
                {dataFiltered.slice(startIndex, endIndex).map((row) => (
                  <VoucherTableRow
                    key={row.discountId}
                    discountId={row.discountId}
                    discountCodeName={row.discountCodeName}
                    discountPercent={row.discountPercent}
                    startingDate={row.startingDate}
                    endDate={row.endDate}
                    isExpried={row.isExpried}
                    onEdit={() => handleOpenEditModal(row)}
                  />
                ))}
                {emptyRowsCount > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsCount }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalDiscounts}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <AddVoucherModal
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />

      <EditVoucherModal
        open={editModalOpen}
        handleClose={handleCloseEditModal}
        voucher={currentVoucher}
        setVoucher={setCurrentVoucher}
        handleSubmit={handleEditVoucher}
      />
    </Container>
  );
}
