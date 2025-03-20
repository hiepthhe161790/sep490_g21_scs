import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import WarrantyService from '../../../services/api/WarrantyService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';
import { PublicContext } from '../../../contexts/publicContext';
export default function Warranties({ refresh }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPageNumber, setCurrentPageNumber] = useState(Number(searchParams.get('page')) || 1);
  const [warrantiesData, setwarrantiesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { categories, brands } = useContext(PublicContext);

  const fetchwarrantiesData = async () => {
    const params = {
      page: currentPageNumber,
      category,
      brand,
      search: search || null,
    };

    console.log("Fetching with params:", params); // Debug xem có đúng không

    const response = await WarrantyService.getFilteredWarrantyProducts(params);

    setwarrantiesData(response.warrantiesProducts || []);
    setTotalPages(response.totalPages || 1);
  };


  useEffect(() => {
    fetchwarrantiesData();
  }, [currentPageNumber, search, warrantiesStatus, warrantyStatus, startDate, endDate, soldStatus]);


  const handleChangePage = (event, value) => {
    setCurrentPageNumber(value);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Title>warranties</Title>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        {/* Ô Search */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
        </Grid>


        {/* Trạng thái sản phẩm & bảo hành cùng một hàng */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" gap={2}>
            <TextField
              label="Danh mục"
              variant="outlined"
              select
              fullWidth
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Thương hiệu"
              variant="outlined"
              select
              fullWidth
              size="small"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Thông tin khách hàng</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số Serial</TableCell>
            <TableCell>Danh Mục</TableCell>
            <TableCell>Thương Hiệu</TableCell>
            <TableCell>Ngày kích hoạt</TableCell>
            <TableCell>Ngày hết bảo hành</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Gửi thông báo bảo hành</TableCell>
            <TableCell>Người tạo</TableCell>
            <TableCell>Hành dộng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warrantiesData.map((warranties, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{warranties.contactInfo.name}</TableCell>
              <TableCell>{warranties.serialNumber}</TableCell>
              <TableCell>{warranties.categoryName}</TableCell>
              <TableCell>{warranties.brandName}</TableCell>
              <TableCell>{warranties.productName}</TableCell>
              <TableCell>{warranties.status ? 'Còn bảo hành' : 'Không có bảo hành'}</TableCell>
              <TableCell>{warranties.warrantyStartDate ? new Date(warranties.warrantyStartDate).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>{warranties.warrantyEndDate ? new Date(warranties.warrantyEndDate).toLocaleDateString() : 'N/A'}</TableCell>
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
