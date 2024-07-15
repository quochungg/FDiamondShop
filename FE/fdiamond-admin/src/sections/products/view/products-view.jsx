import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { Alert, Snackbar, AlertTitle } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { products } from 'src/_mock/products';
// import { products } from 'src/_mock/products';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../../table-no-data';
import ProductTableRow from '../product-table-row';
// import TableEmptyRows from '../../table-empty-rows';
import ProductTableHead from '../product-table-head';
import { applyFilter, getComparator } from '../../utils';
import ProductTableToolbar from '../product-table-toolbar';

// import ProductCard from '../product-card';
// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  // const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);

  const [data, setData] = useState([]);

  const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('productId');

  const [filterById, setFilterById] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const handleClickAdd = () => {
    // Điều hướng đến một đường dẫn mới
    navigate('/products/new');
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get('https://fdiamond-api.azurewebsites.net/api/Product');
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

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = data.map((n) => n.productId);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleFilterByID = (event) => {
    setPage(0);
    setFilterById(event.target.value);
  };

  const handleSort = (event, productId) => {
    const isAsc = orderBy === productId && order === 'asc';
    if (productId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(productId);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterById,
  });

  // const handleClick = (event, productId) => {
  //   const selectedIndex = selected.indexOf(productId);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, productId);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };
  const totalProducts = data.length;
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalProducts);
  const emptyRowsCount = endIndex < rowsPerPage ? rowsPerPage - (endIndex - startIndex) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const notFound = !dataFiltered.length && !!filterById;
  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

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
          Success submitting product data!
        </Alert>
      </Snackbar>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        <Button
          onClick={handleClickAdd}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Product
        </Button>
      </Stack>

      <Card>
        <ProductTableToolbar filterById={filterById} onFilterById={handleFilterByID} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'productId', label: 'ID' },
                  { id: 'productName', label: 'Name', align: 'left' },
                  { id: 'basePrice', label: 'Price' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'subCategoryName', label: 'Shape' },
                  { id: 'isVisible', label: 'Status' },
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
                  <ProductTableRow
                    key={row.productId}
                    productId={row.productId}
                    productName={row.productName}
                    basePrice={row.basePrice}
                    quantity={row.quantity}
                    subCategoryName={row.subCategoryName}
                    isVisible={row.isVisible}
                    // selected={selected.indexOf(row.id) !== -1}
                    // handleClick={(event) => handleClick(event, row.id)}
                  />
                ))}

                {emptyRowsCount > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsCount }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}

                {notFound && <TableNoData query={filterById} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={totalProducts}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget /> */}
    </Container>
  );
}
