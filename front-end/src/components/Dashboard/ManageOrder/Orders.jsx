import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import OrderService from '../../../services/api/OrderService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ContactInfoDialog from './ContactInfoDialog';
import ItemDialog from './ItemDialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import UpdateOrder from './EditOrder';
import { ToastContainer } from 'react-toastify';
import CreateOrder from './CreateOrder';
import { Modal, Box, Typography } from '@mui/material';
export default function Orders({ refresh }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPageNumber, setCurrentPageNumber] = React.useState(Number(searchParams.get('page')) || 1);
  const [orderData, setOrderData] = React.useState({});
  const [search, setSearch] = React.useState(searchParams.get('search') || '');
  const [sortField, setSortField] = React.useState(searchParams.get('sortField') || '');
  const [sortOrder, setSortOrder] = React.useState(searchParams.get('sortOrder') || '');
  const [orderStatus, setOrderStatus] = React.useState(searchParams.get('orderStatus') || '');
  const [paymentStatus, setPaymentStatus] = React.useState(searchParams.get('paymentStatus') || '');
  const [paymentMethod, setPaymentMethod] = React.useState(searchParams.get('paymentMethod') || '');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const page = searchParams.get('page') || 1;
    const data = await OrderService.getAllOrders({
      page,
      search,
      sortField,
      sortOrder,
      orderStatus,
      paymentStatus,
      paymentMethod,
    });
    setOrderData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPageNumber, searchParams,refresh]);

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        newSearchParams.set(key, params[key]);
      } else {
        newSearchParams.delete(key);
      }
    });

    setSearchParams(newSearchParams);
    setCurrentPageNumber(1);
    navigate(`/manager/manage-order?${newSearchParams.toString()}`);
  };

  React.useEffect(() => {
    updateSearchParams({
      page: currentPageNumber,
      search,
      sortField,
      sortOrder,
      orderStatus,
      paymentStatus,
      paymentMethod,
    });
  }, [search, sortField, sortOrder, orderStatus, paymentStatus, paymentMethod]);

  const handleChangePage = (event, value) => {
    event.preventDefault();
    setCurrentPageNumber(value);
    navigate(`/manage-order?page=${value}`);
  };
  const openUpdateModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrderId(null);
    fetchData(currentPageNumber, search, sortField, sortOrder, orderStatus, paymentStatus, paymentMethod);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    fetchData(currentPageNumber, search, sortField, sortOrder, orderStatus, paymentStatus, paymentMethod);
  };

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action here, for example:
    // deleteOrder(orderToDelete);
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };
  // console.log("rendering orders",refresh);
  return (
    <React.Fragment>
      <ToastContainer />
      <Title>Orders</Title>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Sort Field"
            variant="outlined"
            fullWidth
            select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="totalPrice">Total Price</MenuItem>
            <MenuItem value="createdAt">Created At</MenuItem>
            {/* Add more fields as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Sort Order"
            variant="outlined"
            fullWidth
            select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Order Status"
            variant="outlined"
            fullWidth
            select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Payment Status"
            variant="outlined"
            fullWidth
            select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Refunded">Refunded</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Payment Method"
            variant="outlined"
            fullWidth
            select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="VnPay">VnPay</MenuItem>
            <MenuItem value="Cash On Delivery">Cash On Delivery</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={25} sx={{ mb: 2 }} justifyContent="flex-end">
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary" onClick={openCreateModal}>
            Create New Order
          </Button>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Users Role</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Payment Details</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.orders?.map((order, index) => (
            <TableRow style={{ cursor: 'pointer' }} key={index}>
              <TableCell>{order?.userId ? "Customer" : "Guest"}</TableCell>
              <TableCell><ItemDialog items={order?.items} /></TableCell>
              <TableCell><ContactInfoDialog contactInfo={order?.contactInfo} /></TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell>{order?.orderStatus}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell>{order?.paymentDetails?.transactionId || "N/A"}</TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell>
                <Tooltip title="Update">
                  <Button onClick={() => openUpdateModal(order._id)}><BuildCircleIcon color="primary" style={{ cursor: 'pointer' }} /></Button>
                </Tooltip>
                |&nbsp;
                <Tooltip title="Delete">
                  <Button >  <DeleteIcon color="error" style={{ cursor: 'pointer' }} /> </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={deleteModalOpen}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, mx: 'auto', my: '30vh', borderRadius: 1 }}>
          <Typography id="delete-confirmation-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="delete-confirmation-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this order?
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </Box>
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Pagination
          page={currentPageNumber}
          count={orderData.totalPages}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Stack>
      <UpdateOrder orderId={selectedOrderId} open={isUpdateModalOpen} onClose={closeUpdateModal} />
      <CreateOrder open={isCreateModalOpen} onClose={closeCreateModal} />
    </React.Fragment>
  );
}
