import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Popover, MenuItem, TableRow, TableCell, IconButton } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function VoucherTableRow({
  discountId,
  discountCodeName,
  discountPercent,
  startingDate,
  endDate,
  isExpried,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{discountId || '-'}</TableCell>
        <TableCell align="center">{discountCodeName || '-'}</TableCell>
        <TableCell align="center">{discountPercent || '-'}</TableCell>
        <TableCell align="center">
          {startingDate ? dayjs(startingDate).format('DD/MM/YYYY HH:mm') : '-'}
        </TableCell>
        <TableCell align="center">
          {endDate ? dayjs(endDate).format('DD/MM/YYYY HH:mm') : '-'}
        </TableCell>
        <TableCell align="center">
          <Label color={isExpried ? 'success' : 'error'}>{isExpried ? 'Open' : 'Expired'}</Label>
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
            sx: { width: 140 },
          },
        }}
      >
        <MenuItem>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

VoucherTableRow.propTypes = {
  discountId: PropTypes.any,
  discountCodeName: PropTypes.any,
  discountPercent: PropTypes.any,
  startingDate: PropTypes.any,
  endDate: PropTypes.any,
  isExpried: PropTypes.any,
};
