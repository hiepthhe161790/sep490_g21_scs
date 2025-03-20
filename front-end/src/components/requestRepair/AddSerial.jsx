import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell,
    TableHead, TableRow, TableContainer, Paper, TextField, Button, IconButton
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {
    AddBox as AddBoxIcon, IndeterminateCheckBox as IndeterminateCheckBoxIcon
} from '@mui/icons-material';
import SerialProductService from '../../services/api/SerialProductService';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function AddSerial({ product, onClose, refresh }) {
    const [serialNumber, setSerialNumber] = useState('');
    const [serials, setSerials] = useState([]);
    const [open, setOpen] = useState(true);
    const [error, setError] = useState('');
    const [inch, setInch] = useState(product.inch || '');
    const [inchError, setInchError] = useState(false);




    const handleClose = () => {
        setOpen(false);
        setSerials([]);
        setSerialNumber('');
        setError('');
        onClose();
    };

    const handleAddSerial = () => {
        const trimmedSerial = serialNumber.trim();
        if (trimmedSerial === '') {
            setError('Vui lòng nhập số serial!');
            return;
        }
        if (!inch) {
            setInchError(true);
            setError('Vui lòng chọn kích thước!');
            return;
        }
        // Kiểm tra serial đã tồn tại trong danh sách hay chưa
        if (serials.some(serial => serial.serialNumber === trimmedSerial)) {
            setError('Serial đã tồn tại trong danh sách!');
            return;
        }

        setSerials(prev => [...prev, { serialNumber: trimmedSerial, sold: false, inch: product.inch }]);
        setSerialNumber('');
        setError('');
    };

    const handleDeleteSerial = (serialToDelete) => {
        const newData = serials.filter(item => item.serialNumber !== serialToDelete.serialNumber);
        setSerials(newData);
    };

    const handleSerialProduct = async (e) => {
        e.preventDefault();
        if (serials.length === 0) {
            toast.error("Vui lòng nhập số serial và + !");
            return;
        }
        try {
            const result = await SerialProductService.createSerial({
                productId: product.productId,
                serialList: serials
            });

            if (result) {
                toast.success("Thêm serial thành công!");
                setSerials([]);
                refresh();
                handleClose();
            }
        } catch (error) {
            toast.error("Lỗi khi thêm serial: " + error.message);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm Serial</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Số Serial</StyledTableCell>
                                <StyledTableCell>Thuộc tính</StyledTableCell>
                                <StyledTableCell>Trạng thái</StyledTableCell>                                 
                                <StyledTableCell>Hành động</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serials.map((serial, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{serial.serialNumber}</StyledTableCell>
                                    <StyledTableCell>{product.inch}</StyledTableCell>
                                    <StyledTableCell>{serial.sold ? 'Đã bán' : 'Còn hàng'}</StyledTableCell>                                   
                                    <StyledTableCell align="right">
                                        <IndeterminateCheckBoxIcon
                                            style={{ cursor: 'pointer' }}
                                            fontSize="medium"
                                            color="error"
                                            onClick={() => handleDeleteSerial(serial)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <TableCell colSpan={2}>
                                    <TextField
                                        fullWidth
                                        label="Nhập số serial"
                                        value={serialNumber}
                                        onChange={e => setSerialNumber(e.target.value)}
                                        error={!!error}
                                        helperText={error}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        label="Kích thước"
                                        value={inch}
                                        onChange={e => setInch(e.target.value)}
                                        error={inchError}
                                        helperText={inchError ? 'Vui lòng chọn kích thước!' : ''}
                                    />
                                </TableCell>
                                <TableCell>
                                    <AddBoxIcon
                                        style={{ cursor: 'pointer' }}
                                        fontSize="large"
                                        color="primary"
                                        onClick={handleAddSerial}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSerialProduct}
                    style={{ marginTop: 10 }}
                    fullWidth
                >
                    Lưu Serial
                </Button>
            </DialogContent>
        </Dialog>
    );
}