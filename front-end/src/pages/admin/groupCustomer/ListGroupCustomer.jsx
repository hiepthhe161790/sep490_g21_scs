import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Pagination, TextField, Button, Dialog,
    DialogTitle, DialogContent, Grid, Box, Typography
} from '@mui/material';
import GroupCustomerService from '../../../services/api/GroupCustomerService';
import UpdateGroupCustomer from './UpdateGroupCustomer';
import CreateGroupCustomer from './CreateGroupCustomer';

const ListGroupCustomer = () => {
    const [groupCustomers, setGroupCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedGroupCustomer, setSelectedGroupCustomer] = useState(null);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [totalGroupCustomers, setTotalGroupCustomers] = useState(0);

    useEffect(() => {
        const fetchGroupCustomers = async () => {
            const data = await GroupCustomerService.getPaginatedGroupCustomers({ page, limit, search });
            setGroupCustomers(data.data);
            setTotalPages(data.meta.totalPages);
            setTotalGroupCustomers(data.meta.total);
        };
        fetchGroupCustomers();
    }, [page, limit, search]);

    const handleEditClick = (groupCustomer) => {
        setSelectedGroupCustomer(groupCustomer);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedGroupCustomer(null);
    };

    const handleOpenRegisterDialog = () => {
        setOpenRegisterDialog(true);
    };

    const handleCloseRegisterDialog = () => {
        setOpenRegisterDialog(false);
    };

    const handleCreateSuccess = () => {
        setPage(1);
        setSearch('');
    };

    const handleUpdateSuccess = () => {
        setPage(1);
        setSearch('');
    };

    return (
        <div>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={10}>
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                        <Typography variant="h8" fontWeight="bold">
                           Số nhóm khách hàng được tìm thấy:
                            <Typography component="span" color="primary" fontWeight="bold">
                                {` ${totalGroupCustomers}`}
                            </Typography>
                        </Typography>
                        <TextField
                            label="Tìm kiếm"
                            placeholder="Nhập từ thông tin tìm kiếm..."
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={2} textAlign={{ xs: 'center', md: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenRegisterDialog}
                    >
                        Tạo nhóm khách hàng
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Tên nhóm khách hàng</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>% chiết khấu</TableCell>
                            <TableCell>Hạn mức công nợ</TableCell>
                            <TableCell>Đặc quyền riêng</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupCustomers.map((groupCustomer) => (
                            <TableRow key={groupCustomer?._id}>
                                <TableCell>{groupCustomer?.name}</TableCell>
                                <TableCell>{groupCustomer?.description}</TableCell>
                                <TableCell>{groupCustomer?.discountRate}</TableCell>
                                <TableCell>{groupCustomer?.creditLimit}</TableCell>
                                <TableCell>{groupCustomer?.specialPrivileges.join(', ')}</TableCell>
                                <TableCell>{groupCustomer?.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditClick(groupCustomer)}
                                    >
                                        Xem và sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    size="large"
                    shape="rounded"
                />
            </Box>

            {/* Dialog for UpdateGroupCustomer form */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Chỉnh sửa nhóm khách hàng</DialogTitle>
                <DialogContent>
                    {selectedGroupCustomer && (
                        <UpdateGroupCustomer
                            groupCustomer={selectedGroupCustomer}
                            onClose={handleCloseEditDialog}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog for RegisterGroupCustomer form */}
            <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
                <DialogTitle>Tạo nhóm khách hàng mới</DialogTitle>
                <DialogContent>
                    <CreateGroupCustomer
                        onClose={handleCloseRegisterDialog}
                        onCreateSuccess={handleCreateSuccess}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListGroupCustomer;