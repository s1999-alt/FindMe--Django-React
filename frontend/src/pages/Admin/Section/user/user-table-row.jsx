import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../../../components/admin/label/label'
import Iconify from '../../../../components/admin/iconify/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  userid,
  firstname,
  lastname,
  email,
  // phone,
  status,
  selected,
  handleClick,
  avatarUrl,
  handleBlockUser,
  handleUnblockUser,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const getStatusColor = () => {
    if (status === 'Active') {
      return 'success'
    } else if (status === 'Inactive') {
      return 'error';
    }
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={firstname} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {firstname}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell>{lastname}</TableCell>

        <TableCell>{email}</TableCell>

        {/* <TableCell>{phone}</TableCell> */}


        <TableCell>
          <Label color={getStatusColor()}>{status}</Label>
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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {(status === 'Active') ? (
        <MenuItem onClick={() => handleBlockUser(userid)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:slash-outline" sx={{ mr: 2 }} />
          Block
        </MenuItem>
        ) : (
          <MenuItem onClick={() => handleUnblockUser(userid)} sx={{ color: 'success.main' }}>
          <Iconify icon="eva:checkmark-outline" sx={{ mr: 2 }} />
          UnBlock
        </MenuItem>
        )
    }
        
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.string,
  handleBlockUser: PropTypes.func,
  handleUnblockUser: PropTypes.func,
};
