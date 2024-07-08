// import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ firstName, lastName, address, phoneNumber, userName }) {
  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{firstName || '-'}</TableCell>
        <TableCell align="center">{lastName || '-'}</TableCell>
        <TableCell align="center">{address || '-'}</TableCell>
        <TableCell align="center">{phoneNumber || '-'}</TableCell>
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
  userName: PropTypes.any,
};
