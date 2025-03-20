import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Pagination, TextField, Select, MenuItem, FormControl, InputLabel, Button, Dialog,
    DialogTitle, DialogContent, Grid, Box, Typography,
    colors
} from '@mui/material';
import UserService from '../../../services/userService';
import { formatDate } from '../../../utils/handleFormat';
import UpdateUser from './UpdateUser';
import RegisterUser from './RegisterUser';

const roleMapping = {
    ADMIN: 'Quản trị viên',
    MANAGER: 'Quản lí viên',
    CUSTOMER: 'Khách hàng',
};

const getRoleInVietnamese = (role) => roleMapping[role] || 'Không xác định';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await UserService.getPaginatedUsers(page, limit, search, role);
            setUsers(data.data);
            setTotalPages(data.meta.totalPages);
            setTotalUsers(data.meta.total);
        };
        fetchUsers();
    }, [page, limit, search, role]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedUser(null);
    };

    const handleOpenRegisterDialog = () => {
        setOpenRegisterDialog(true);
    };

    const handleCloseRegisterDialog = () => {
        setOpenRegisterDialog(false);
    };

    return (
        <div>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={10}>
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                        <Typography variant="h8" fontWeight="bold">
                           Số người dùng được tìm thấy:
                            <Typography component="span" color="primary" fontWeight="bold">
                                {` ${totalUsers}`}
                            </Typography>
                        </Typography>
                        <TextField
                            label="Tìm kiếm"
                            placeholder="Nhập từ thông tin tìm kiếm..."
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Vai trò</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="">Tất cả</MenuItem>
                                <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                                <MenuItem value="MANAGER">Quản lí viên</MenuItem>
                                <MenuItem value="CUSTOMER">Khách hàng</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2} textAlign={{ xs: 'center', md: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenRegisterDialog}
                    >
                        Tạo tài khoản
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Họ</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Công cụ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user?._id}>
                                <TableCell>{user?.fname}</TableCell>
                                <TableCell>{user?.lname}</TableCell>
                                <TableCell>{formatDate(user?.dob)}</TableCell>
                                <TableCell>{user?.phoneNumber}</TableCell>
                                <TableCell>{user?.firebaseUID}</TableCell>
                                <TableCell>{getRoleInVietnamese(user?.role)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditClick(user)}
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

            {/* Dialog for UpdateUser form */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <UpdateUser user={selectedUser} onClose={handleCloseEditDialog} />
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog for RegisterUser form */}
            <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
                <DialogTitle>Tạo tài khoản mới</DialogTitle>
                <DialogContent>
                    <RegisterUser />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserList;