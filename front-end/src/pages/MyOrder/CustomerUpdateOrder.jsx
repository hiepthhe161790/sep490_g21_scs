import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import OrderService from '../../services/api/OrderService';
import { toast } from 'react-toastify';

const CustomerUpdateOrder = ({ orderId, open, onClose, onOrderUpdated }) => {
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (open) {
      const fetchOrder = async () => {
        try {
          const orderData = await OrderService.getOrderById(orderId);
          setOrder(orderData);
          setOrderStatus(orderData.orderStatus);
          setContactInfo(orderData.contactInfo);
        } catch (error) {
            console.log(error); 
          toast.error('Failed to fetch order data');
        }
      };
      fetchOrder();
    }
  }, [orderId, open]);

  const handleUpdateOrder = async () => {
    if (orderStatus === 'Cancelled') return;

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (orderStatus === 'Pending' && newStatus === 'Cancelled') {
      setConfirmCancel(true);
      return;
    }

    try {
      await OrderService.updateOrder(orderId, { orderStatus: newStatus || orderStatus, contactInfo });
      toast.success('Order updated successfully');
      onOrderUpdated(); // Gọi hàm này sau khi cập nhật thành công
      onClose();
    } catch (error) {
        console.log(error);
      toast.error('Error updating order');
    }
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOrderStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  if (!order) return null;

  const isEditable = orderStatus === 'Pending';

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Order Status"
                  variant="outlined"
                  fullWidth
                  select
                  value={newStatus || orderStatus}
                  onChange={handleOrderStatusChange}
                  disabled={!isEditable}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={contactInfo.address}
                  onChange={handleContactInfoChange}
                  disabled={!isEditable}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Close</Button>
          {isEditable && orderStatus !== 'Cancelled' && (
            <Button onClick={handleUpdateOrder} color="primary">Update Order</Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={confirmCancel} onClose={() => setConfirmCancel(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancel(false)} color="secondary">No</Button>
          <Button 
            onClick={async () => {
              try {
                await OrderService.updateOrder(orderId, { orderStatus: 'Cancelled', contactInfo });
                toast.success('Order cancelled successfully');
                onClose();
                onOrderUpdated(); // Gọi hàm này sau khi hủy thành công
              } catch (error) {
                toast.error('Error cancelling order');
              }
              setConfirmCancel(false);
            }}
            color="primary"
          >Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerUpdateOrder;