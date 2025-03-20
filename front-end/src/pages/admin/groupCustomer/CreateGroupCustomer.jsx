import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import GroupCustomerService from '../../../services/api/GroupCustomerService';

const CreateGroupCustomer = ({ onClose, onCreateSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        discountRate: 0,
        creditLimit: 0,
        specialPrivileges: [],
        isActive: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await GroupCustomerService.createGroupCustomer(formData);
            alert('Tạo nhóm khách hàng thành công!');
            onCreateSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating group customer:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Tên nhóm khách hàng"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="% chiết khấu"
                name="discountRate"
                type="number"
                value={formData.discountRate}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Hạn mức công nợ"
                name="creditLimit"
                type="number"
                value={formData.creditLimit}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Đặc quyền riêng"
                name="specialPrivileges"
                value={formData.specialPrivileges}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.isActive}
                        onChange={handleCheckboxChange}
                        name="isActive"
                    />
                }
                label="Hoạt động"
            />
            <Button type="submit" variant="contained" color="primary">
                Tạo mới
            </Button>
        </Box>
    );
};

export default CreateGroupCustomer;