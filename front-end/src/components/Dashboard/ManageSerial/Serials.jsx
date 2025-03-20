import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import SerialProductService from '../../../services/api/SerialProductService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';

export default function Serials({ refresh }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPageNumber, setCurrentPageNumber] = useState(Number(searchParams.get('page')) || 1);
  const [serialData, setSerialData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [serialStatus, setSerialStatus] = useState(searchParams.get('serialStatus') || '');
  const [warrantyStatus, setWarrantyStatus] = useState(searchParams.get('warrantyStatus') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [soldStatus, setSoldStatus] = useState(searchParams.get('sold') || '');

  const fetchSerialData = async () => {
    const params = {
      page: currentPageNumber,
      startDate: startDate || null,
      endDate: endDate || null,
      sold: soldStatus,
      warranty: warrantyStatus,
      search: search || null,
    };

    const response = await SerialProductService.getFilteredSerialNumberProducts(params);

    setSerialData(response.serialProducts || []);
    setTotalPages(response.totalPages || 1);
  };

  useEffect(() => {
    setCurrentPageNumber(1); 
  }, [search, serialStatus, warrantyStatus, startDate, endDate, soldStatus])
  useEffect(() => {
    fetchSerialData();
  }, [currentPageNumber, search, serialStatus, warrantyStatus, startDate, endDate, soldStatus]);


  const handleChangePage = (event, value) => {
    setCurrentPageNumber(value);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Title>Serials</Title>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        {/* Ô Search */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            placeholder="Search by product name or serial number"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
        </Grid>

        {/* Ô Chọn ngày */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" gap={2}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              shrink
              fullWidth
              size="small"
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              shrink
              fullWidth
              size="small"
            />
          </Box>
        </Grid>

        {/* Trạng thái sản phẩm & bảo hành cùng một hàng */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" gap={2}>
            <TextField
              label="Trạng thái sản phẩm"
              variant="outlined"
              select
              fullWidth
              size="small"
              value={soldStatus}
              onChange={(e) => setSoldStatus(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value={true}>Đã bán</MenuItem>
              <MenuItem value={false}>Chưa bán</MenuItem>
            </TextField>

            <TextField
              label="Trạng thái bảo hành"
              variant="outlined"
              select
              fullWidth
              size="small"
              value={warrantyStatus}
              onChange={(e) => setWarrantyStatus(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value={true}>Còn bảo hành</MenuItem>
              <MenuItem value={false}>Hết bảo hành</MenuItem>
            </TextField>
          </Box>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Serial</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Trạng thái sản phẩm</TableCell>
            <TableCell>Trạng thái bảo hành</TableCell>
            <TableCell>Ngày kích hoạt bảo hành</TableCell>
            <TableCell>Ngày hết hạn bảo hành</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serialData.map((serial, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{serial.productName} {serial?.inch.replace(' inch', 'in')}</TableCell>
              <TableCell>{serial.serialNumber}</TableCell>
              <TableCell>{new Date(serial.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{serial.sold ? 'Đã bán' : 'Chưa bán'}</TableCell>
              <TableCell>{serial.warrantyStatus ? 'Còn bảo hành' : 'Không có bảo hành'}</TableCell>
              <TableCell>{serial.warrantyStartDate ? new Date(serial.warrantyStartDate).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>{serial.warrantyEndDate ? new Date(serial.warrantyEndDate).toLocaleDateString() : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Pagination
          page={currentPageNumber}
          count={totalPages}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Stack>
    </React.Fragment>
  );
}
