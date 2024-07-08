import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { TableRow, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import UserTableRow from '../user-table-row';
import TableNoData from '../../table-no-data';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterFirstName, setFilterFirstName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(
          'https://fdiamond-api.azurewebsites.net/api/Users/getalluser'
        );
        if (response.data && Array.isArray(response.data.result)) {
          const customers = response.data.result.filter((user) => user.role === 'customer');
          setData(customers);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAll();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterFirstName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterFirstName,
  });

  const notFound = !dataFiltered.length && !!filterFirstName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          filterFirstName={filterFirstName}
          onFilterFirstName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'firstName', label: 'First Nam' },
                  { id: 'lastName', label: 'Last Name' },
                  { id: 'address', label: 'Address' },
                  { id: 'phoneNumber', label: 'Phone' },
                  { id: 'userName', label: 'Email' },
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
                    <UserTableRow
                      key={row.userName}
                      firstName={row.firstName}
                      lastName={row.lastName}
                      address={row.address}
                      phoneNumber={row.phoneNumber}
                      userName={row.userName}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />

                {notFound && <TableNoData query={filterFirstName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
