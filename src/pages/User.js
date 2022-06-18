/* eslint-disable camelcase */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showSuccessMsg, showErrMsg } from '../utils/notification/Notification';

import Backdrop from '@mui/material/Backdrop';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LoadingButton } from '@mui/lab';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  err: '',
  success: '',
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  borderRadius: '17px',
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: 24,
  p: 4,
};

export default function User() {
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [opene, setOpene] = React.useState(false);
  const handleOpene = () => setOpene(true);
  const handleClosee = () => setOpene(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: '', success: '' });
  };

  const [utilisateur, setUtilisateur] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getUsers/${localStorage.getItem('userId')}`).then((res) => {
      setUtilisateur(res.data.users);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      setUser({ ...user });
      axios
        .post(`http://localhost:5000/admin/addUser/${localStorage.getItem('userId')}`, {
          name,
          email,
          password: cf_password,
        })
        .then((res) => {
          setUser({
            ...user,
            name: '',
            email: '',
            password: '',
            cf_password: '',
          });

          toast.success(res.data.message);
        })
        .catch((err) => {
          setUser({
            ...user,
            name: '',
            email: '',
            password: '',
            cf_password: '',
          });
          console.log(err.response);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  const deleteUser = (id) => {
    console.info('firas:', id);
    let query = {
      method: 'delete',
      url: `http://localhost:5000/admin/deleteUser/${localStorage.getItem('userId')}`,
      data: { userId: id },
    };
    setLoading(true);
    axios(query);
    setLoading(false);
    setCallback(!callback);
  };
  return (
    <Page title="User">
      <Container style={{ width: '65rem', position: 'sticky', marginTop: '7rem', left: '20%' }}>
        <div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <h3>Loading.....</h3>}
        </div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            variant="contained"
            onClick={handleOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <h3 className="text-2xl xl:text-3xl font-extrabold">Add user</h3>
                <br />

                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                >
                  <OutlinedInput
                    defaultValue="Small"
                    size="xs"
                    type="text"
                    placeholder="Enter user's name"
                    id="name"
                    value={name}
                    name="name"
                    onChange={handleChangeInput}
                  />
                  <br /> <br />
                  <OutlinedInput
                    type="text"
                    placeholder="Enter email address"
                    id="email"
                    value={email}
                    name="email"
                    onChange={handleChangeInput}
                  />{' '}
                  <br /> <br />
                  <OutlinedInput
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    value={password}
                    name="password"
                    onChange={handleChangeInput}
                  />{' '}
                  <br /> <br />
                  <OutlinedInput
                    type="password"
                    placeholder="Confirm password"
                    id="cf_password"
                    value={cf_password}
                    name="cf_password"
                    onChange={handleChangeInput}
                  />{' '}
                  <br /> <br />
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                    <span className="ml-3"> Add user</span>
                  </LoadingButton>
                </form>
              </Box>
            </Fade>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {utilisateur.map((val, key) => (
                    <TableRow hover key={key} tabIndex={-1} role="checkbox">
                      <TableCell padding="checkbox">
                        <Checkbox onChange={(event) => handleClick(event, name)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src="nn" />

                          <Typography variant="subtitle2" noWrap>
                            {val.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell style={{}} align="left" noWrap>
                        {val.email}
                      </TableCell>
                      <TableCell style={{}} align="left" noWrap>
                        {'user'}
                      </TableCell>
                      <TableCell style={{}} align="left" noWrap>
                        {' '}
                        <Iconify
                          style={{ cursor: 'pointer' }}
                          icon="flat-color-icons:ok"
                          color="blue"
                          width={34}
                          height={32}
                          align="center"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Label variant="ghost" style={{ backgroundColor: 'green' }}>
                          {val.isConnected ? 'connected' : 'disconnected'}
                        </Label>
                      </TableCell>

                      <TableCell align="right">
                        <Stack direction="row" spacing={1}>
                          <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleOpene}>
                            <Iconify icon="fluent:delete-28-regular" color="#DF3E30" width={24} height={22} />
                          </Button>
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={opene}
                            onClose={handleClosee}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={opene}>
                              <Box sx={style}>
                                <h5 style={{ color: 'blue', display: 'flex', justifyContent: 'center' }}>
                                  Are you sure for delete this category!
                                </h5>
                                <br />
                                <br />

                                <div
                                  key={key}
                                  style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
                                >
                                  <Iconify
                                    style={{ cursor: 'pointer' }}
                                    icon="flat-color-icons:ok"
                                    color="blue"
                                    width={34}
                                    height={32}
                                    disabled={loading}
                                    onClick={(id) => {
                                      console.info(id);
                                      deleteUser(val._id);
                                    }}
                                  />
                                  <Iconify
                                    icon="bi:x-circle"
                                    color="red"
                                    width={34}
                                    height={32}
                                    onClick={handleClosee}
                                  />
                                </div>
                              </Box>
                            </Fade>
                          </Modal>{' '}
                          <Button fullWidth size="large" color="inherit" variant="outlined">
                            <Iconify icon="ant-design:edit-outlined" color="blue" width={24} height={22} />
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
