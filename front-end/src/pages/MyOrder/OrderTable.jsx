import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Button } from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import CustomerUpdateOrder from './CustomerUpdateOrder';

const OrderTable = ({ orders, handleOpen, fetchOrders }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openUpdateModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedOrderId(null);
    setIsUpdateModalOpen(false);
  };

  const handleOrderUpdated = () => {
    closeUpdateModal();
    fetchOrders(); // Fetch lại dữ liệu đơn hàng sau khi cập nhật thành công
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>View Details</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Box display="flex" flexDirection="column">
                  <Typography>{order?.items[0]?.productId?.name}</Typography>
                  {order.items.length > 1 && (
                    <Button size="small" onClick={() => handleOpen(order)}>View More Products</Button>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {order?.contactInfo
                  ? `${order.contactInfo.name}, ${order.contactInfo.email}, ${order.contactInfo.phone}, ${order.contactInfo.address}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{order.totalPrice}đ</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(order)}>
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => openUpdateModal(order._id)}>
                  <Edit />
                </IconButton>
                <CustomerUpdateOrder 
                  orderId={selectedOrderId} 
                  open={isUpdateModalOpen} 
                  onClose={closeUpdateModal} 
                  onOrderUpdated={handleOrderUpdated} // Gọi hàm này sau khi cập nhật thành công
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
