import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Popover, MenuItem, TableRow, TableCell, IconButton } from '@mui/material';

import { AccountContext } from 'src/_mock/AccountContext';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

const statusColors = {
  Pending: 'warning',
  Ordered: 'primary',
  Completed: 'success',
  Cancelled: 'error',
  Preparing: 'warning',
  Shipping: 'info',
};

export default function OrderTableRow({ orderId, orderDate, totalPrice, paymentMethod, status }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEdit = () => {
    if (account.role === 'admin') {
      navigate(`/order/${orderId}`);
    } else if (account.role === 'ordermanagementstaff') {
      navigate(`/order-prepare/${orderId}`);
    } else if (account.role === 'deliverystaff') {
      navigate(`/order-delivery/${orderId}`);
    }
    handleCloseMenu();
  };
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{orderId || '-'}</TableCell>
        <TableCell align="center">
          {orderDate ? dayjs(orderDate).format('DD/MM/YYYY HH:mm') : '-'}
        </TableCell>
        <TableCell align="center">{totalPrice || '-'}</TableCell>
        <TableCell align="center">
          <Label color={paymentMethod ? 'primary' : 'warning'}>
            {paymentMethod || 'Awaiting payment'}
          </Label>
        </TableCell>
        <TableCell align="center">
          <Label variant="filled" color={statusColors[status] || 'default'}>
            {status || '-'}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 100 },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}

OrderTableRow.propTypes = {
  orderId: PropTypes.any,
  orderDate: PropTypes.any,
  totalPrice: PropTypes.any,
  paymentMethod: PropTypes.any,
  status: PropTypes.any,
};
