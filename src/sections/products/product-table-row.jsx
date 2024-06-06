import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  // selected,
  productId,
  productName,
  basePrice,
  quantity,
  subCategoryId,
  isVisible,
  // handleClick,
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEdit = () => {
    navigate(`/edit-product/${productId}`);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        {/* <TableCell component="th" scope="row" padding="none"> */}
        {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={cover} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack> */}
        {/* {id}
        </TableCell> */}
        <TableCell align="center">{productId}</TableCell>

        <TableCell align="center">{productName}</TableCell>

        <TableCell align="center">{basePrice}</TableCell>
        <TableCell align="center">{quantity}</TableCell>
        <TableCell align="center">{subCategoryId}</TableCell>
        <TableCell align="center">
          {/* <Label color={(status === 'false' && 'error') || 'success'}>{status}</Label> */}
          {/*  */}
          {isVisible ? 'Visible' : 'Hidden'}
        </TableCell>

        {/* <TableCell align="center">{colors ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
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

ProductTableRow.propTypes = {
  basePrice: PropTypes.any,
  // handleClick: PropTypes.func,
  quantity: PropTypes.any,
  subCategoryId: PropTypes.any,
  isVisible: PropTypes.any,
  productName: PropTypes.any,
  productId: PropTypes.any,
  // selected: PropTypes.any,
};
