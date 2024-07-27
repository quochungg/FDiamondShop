import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({
  firstName,
  lastName,
  address,
  phoneNumber,
  role,
  userName,
}) {
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{firstName || '-'}</TableCell>
        <TableCell align="center">{lastName || '-'}</TableCell>
        <TableCell align="center">{address || '-'}</TableCell>
        <TableCell align="center">{phoneNumber || '-'}</TableCell>
        <TableCell align="center">{role || '-'}</TableCell>
        <TableCell align="center">{userName || '-'}</TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

UserTableRow.propTypes = {
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  address: PropTypes.any,
  phoneNumber: PropTypes.any,
  role: PropTypes.any,
  userName: PropTypes.any,
};
