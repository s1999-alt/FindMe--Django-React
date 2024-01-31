import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from '../../../../../_mock/user';

import Iconify from '../../../../../components/admin/iconify/iconify';
import Scrollbar from '../../../../../components/admin/scrollbar/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [users, setUsers] = useState([]) 

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responce = await axios.get('http://localhost:8000/api/v1/admin/users')
        setUsers(responce.data.users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers();
  },[])


 const handleBlockUser = async (userId) => {
    await axios.patch(`http://localhost:8000/api/v1/admin/block/${userId}`,{
      is_active:false
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })

    setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === userId ? { ...user, is_active: false } : user
    )

  );
 }

 const handleUnblockUser = async (userId) => {
  
    await axios.patch(`http://localhost:8000/api/v1/admin/block/${userId}`,{
      is_active:true
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })

    setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === userId ? { ...user, is_active: true } : user
    )

  )
 }


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({  
    inputData: Array.isArray(users) ? users : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  console.log('users:', users);
  console.log('dataFiltered:', dataFiltered);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'first_name', label: 'FirstName' },
                  { id: 'last_name', label: 'LastName' },
                  { id: 'email', label: 'Email' },
                  // { id: 'phone', label: 'Phone', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    console.log(user.id,'\n\n\n aksdfjlkadflkj');
                    return (
                    <UserTableRow
                      key={user.id}
                      userid = {user.id}
                      firstname={user.first_name}
                      lastname={user.last_name}
                      email={user.email}
                      phone={user.phone}
                      status={user.is_active ? 'Active' : 'Inactive'}
                      selected={selected.indexOf(user.id) !== -1}
                      handleClick={(event) => handleClick(event, user.id)}
                      handleBlockUser={handleBlockUser}
                      handleUnblockUser={handleUnblockUser}
                    />
                  )})}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
