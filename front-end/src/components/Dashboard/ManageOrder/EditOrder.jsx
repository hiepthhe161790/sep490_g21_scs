import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, MenuItem, Paper, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import OrderService from '../../../services/api/OrderService';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import ProcessingIcon from '@mui/icons-material/Build';
import ShippedIcon from '@mui/icons-material/LocalShipping';
import DeliveredIcon from '@mui/icons-material/CheckCircle';
import CancelledIcon from '@mui/icons-material/Cancel';
import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import FailedIcon from '@mui/icons-material/ErrorOutline';
import RefundedIcon from '@mui/icons-material/Replay';
import { toast } from 'react-toastify';

const UpdateOrder = ({ orderId, open, onClose }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [orderStatusNew, setOrderStatusNew] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchOrder = async () => {
        const orderData = await OrderService.getOrderById(orderId);
        setOrderStatus(orderData.orderStatus);
        setPaymentStatus(orderData.paymentStatus);
        setContactInfo(orderData.contactInfo);
      };
      fetchOrder();
    }
  }, [orderId, open]);

  const handleUpdateOrder = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address) {
      toast.error('All contact information fields are required.');
      return;
    }

    const updatedOrder = {
      orderStatus: orderStatusNew,
      paymentStatus,
      contactInfo
    };

    try {
      await OrderService.updateOrder(orderId, updatedOrder);
      toast.success('Order updated successfully');
      onClose();
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <PendingIcon />;
      case 'Processing':
        return <ProcessingIcon />;
      case 'Shipped':
        return <ShippedIcon />;
      case 'Delivered':
        return <DeliveredIcon />;
      case 'Cancelled':
        return <CancelledIcon />;
      default:
        return null;
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <PendingIcon />;
      case 'Completed':
        return <CompletedIcon />;
      case 'Failed':
        return <FailedIcon />;
      case 'Refunded':
        return <RefundedIcon />;
      default:
        return null;
    }
  };

  const handleConfirmUpdate = () => {
    if (orderStatusNew === 'Delivered' || orderStatusNew === 'Cancelled') {
      setConfirmOpen(true);
    } else {
      handleUpdateOrder();
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmYes = () => {
    setConfirmOpen(false);
    handleUpdateOrder();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
            <Typography sx={{ mb: 4 }} variant="h4" gutterBottom>
              Update Order
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Order Status"
                  variant="outlined"
                  fullWidth
                  select
                  value={orderStatusNew || orderStatus}
                  onChange={(e) => setOrderStatusNew(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getOrderStatusIcon(orderStatusNew || orderStatus)}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Payment Status"
                  variant="outlined"
                  fullWidth
                  select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getPaymentStatusIcon(paymentStatus)}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                  <MenuItem value="Refunded">Refunded</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={contactInfo?.name}
                  onChange={handleContactInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={contactInfo?.email}
                  onChange={handleContactInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={contactInfo?.phone}
                  onChange={handleContactInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={contactInfo?.address}
                  onChange={handleContactInfoChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {orderStatus !== 'Delivered' && orderStatus !== 'Cancelled' ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmUpdate}
                    sx={{ mt: 2 }} // Thêm khoảng cách trên nút
                  >
                    Update Order
                  </Button>
                ) : (
                  <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                    (Đơn hàng này đã hoàn thành, không thể cập nhật)
                  </Typography>
                )}
                <Button onClick={onClose} color="secondary">Cancel</Button>
                
              </Grid>

            </Grid>
          </Paper>
        </Box>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update the order with status "{orderStatus}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">No</Button>
          <Button onClick={handleConfirmYes} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateOrder;