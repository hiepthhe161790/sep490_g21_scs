import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell,
    TableHead, TableRow, TableContainer, Paper, Tooltip, TextField, Button, Select, MenuItem,
    Tab
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {
    AddBox as AddBoxIcon, VisibilityOutlined as VisibilityOutlinedIcon,
    IndeterminateCheckBox as IndeterminateCheckBoxIcon
} from '@mui/icons-material';
import SerialProductService from '../../../services/api/SerialProductService';
import ReactPaginate from "react-paginate";
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

export default function AddSerial({ product }) {
    const [serialNumber, setSerialNumber] = useState('');
    const [serials, setSerials] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [serialData, setSerialData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);
    const [inch, setInch] = useState('');
    const [inchError, setInchError] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchSerialData();
    }, [product]);

    const fetchSerialData = async () => {
        if (!product?._id) return;
        try {
            const response = await SerialProductService.getSerialByProductId(product._id);
            setSerialData(response);
        } catch (error) {
            // console.error("Lỗi khi lấy dữ liệu serial:", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSerials([]);
        setSerialNumber('');
        setError('');
    };

    const handleAddSerial = () => {
        const trimmedSerial = serialNumber.trim();
        if (trimmedSerial === '') {
            setError('Vui lòng nhập số serial!');
            return;
        }
        if (!inch) {
            setInchError(true);
            return;
        }
        // Kiểm tra serial đã tồn tại trong danh sách hay chưa
        if (serials.some(serial => serial.serialNumber === trimmedSerial)) {
            setError('Serial đã tồn tại trong danh sách!');
            return;
        }

        setSerials(prev => [...prev, { serialNumber: trimmedSerial, sold: false, inch }]);
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
                productId: product._id,
                    serialList: serials, inch
            });

            if (result) {
                toast.success("Thêm serial thành công!");
                setSerials([]);
                setOpen(false);
                fetchSerialData();
            }
        } catch (error) {
            toast.error("Lỗi khi thêm serial: " + error.message);
        }
    };

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = serialData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(serialData.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % serialData.length;
        const newStart = newOffset + 1;

        setItemOffset(newOffset);
        setItemStart(newStart);
    };
    const [openSerial, setOpenSerial] = useState(false);

    return (
        <React.Fragment>
            <Tooltip title="View Serial">
                <VisibilityOutlinedIcon fontSize='small' color="info" onClick={() => setOpenSerial(true)} />
            </Tooltip>
            <Dialog open={openSerial} onClose={() => setOpenSerial(false)}>
                <DialogTitle>Thêm serial</DialogTitle>
                <DialogContent>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            variant="outlined"
                            color="info"
                            onClick={handleClickOpen}
                            startIcon={<AddBoxIcon />}
                            style={{ cursor: 'pointer' }}
                        >
                            Thêm Serial
                        </Button>
                    </Tooltip>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>STT</StyledTableCell>
                                <StyledTableCell>Số Serial</StyledTableCell>
                                <StyledTableCell>Trạng thái</StyledTableCell>
                                <StyledTableCell>Ngày hết bảo hành</StyledTableCell>
                                <StyledTableCell>Ngày tạo</StyledTableCell>
                                <StyledTableCell>Ngày cập nhật</StyledTableCell>
                                <StyledTableCell>Thời gian bảo hành(tháng)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.length > 0 ? (
                                currentItems.map((serial, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{itemOffset + index + 1}</StyledTableCell>
                                        <StyledTableCell>{serial?.serialNumber}</StyledTableCell>
                                        <StyledTableCell>{serial?.sold ? 'Đã bán' : 'Còn hàng'}</StyledTableCell>
                                        <StyledTableCell> {serial?.warrantyStartDate ? new Date(serial?.warrantyStartDate).toLocaleDateString() : 'Chưa có'}</StyledTableCell>
                                        <StyledTableCell>{new Date(serial?.createdAt).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell>{new Date(serial?.updatedAt).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell>{product.warrantyPeriod}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={7} align="center" sx={{ color: 'red' }}>
                                        Sản phẩm này chưa có mã serial nào
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
                        <ReactPaginate
                            nextLabel=""
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel=""
                            pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                            pageClassName="mr-6"
                            containerClassName="flex text-base font-semibold font-titleFont py-10"
                            activeClassName="bg-black text-white"
                        />

                        <p className="text-base font-normal text-lightText">
                            Số serial từ {itemStart} đến {Math.min(endOffset, serialData.length)} của {serialData.length}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

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
                                        <StyledTableCell>{serial.inch}</StyledTableCell>
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
                                        <Select
                                            fullWidth
                                            value={inch}
                                            onChange={e => setInch(e.target.value)}
                                            displayEmpty
                                            error={!inch && inchError}
                                        >
                                            <MenuItem value="">Chọn kích thước</MenuItem>
                                            {product?.inStock?.length > 0 ? (
                                                product.inStock.map((item, index) => (
                                                    <MenuItem key={index} value={item.color}>{item.color}</MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>Vui lòng nhập thêm kích thước</MenuItem>
                                            )}
                                        </Select>
                                        {!inch && inchError && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>Vui lòng chọn kích thước!</p>}
                                    </TableCell>
                                    <TableCell></TableCell>
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
        </React.Fragment>
    );
}