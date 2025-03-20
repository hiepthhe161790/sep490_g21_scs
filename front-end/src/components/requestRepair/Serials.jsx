import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Pagination, Stack, TextField, Grid, Button, Tabs, Tab, Checkbox, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddSerial from './AddSerial';
import SerialProductService from '../../services/api/SerialProductService';

export default function Serials({ onAddProducts }) {
  const [searchParams] = useSearchParams();
  const [currentPageNumber, setCurrentPageNumber] = useState(Number(searchParams.get('page')) || 1);
  const [serialData, setSerialData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedSerials, setSelectedSerials] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [openAddSerial, setOpenAddSerial] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSerialData = async () => {
    const params = {
      page: currentPageNumber,
      search: search || null,
    };

    const response = await SerialProductService.getFilteredSerialNumberProducts(params);

    setSerialData(response.serialProducts || []);
    setTotalPages(response.totalPages || 1);
  };

  useEffect(() => {
    setCurrentPageNumber(1); 
  }, [search]);

  useEffect(() => {
    fetchSerialData();
  }, [currentPageNumber, search]);

  const handleChangePage = (event, value) => {
    setCurrentPageNumber(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSerials(serialData.map((serial) => serial));
    } else {
      setSelectedSerials([]);
    }
  };

  const handleSelectSerial = (event, serial) => {
    if (event.target.checked) {
      setSelectedSerials((prev) => [...prev, serial]);
    } else {
      setSelectedSerials((prev) => prev.filter((item) => item.serialNumber !== serial.serialNumber));
    }
  };

  const handleAddToProductInfo = () => {
    onAddProducts(selectedSerials);
    setSelectedSerials([]); // Reset sau khi thêm vào ProductInfo
  };

  const handleOpenAddSerial = (product) => {
    setSelectedProduct(product);
    setOpenAddSerial(true);
  };

  const handleCloseAddSerial = () => {
    setOpenAddSerial(false);
    setSelectedProduct(null);
  };

  return (
    <React.Fragment>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Chọn sản phẩm có sẵn" />
        <Tab label="Chọn sản phẩm ngoài cửa hàng" />
      </Tabs>

      {tabIndex === 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Vui lòng chọn các sản phẩm bạn muốn sửa</h2>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToProductInfo}
                disabled={selectedSerials.length === 0}
              >
                + Thêm
              </Button>
            </Grid>
          </Grid>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedSerials.length === serialData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>STT</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Trạng thái bảo hành</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serialData.map((serial, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSerials.some(item => item.serialNumber === serial.serialNumber)}
                      onChange={(e) => handleSelectSerial(e, serial)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{serial.productName}</TableCell>
                  <TableCell>{serial.serialNumber}</TableCell>
                  <TableCell>{serial?.inch}</TableCell>
                  <TableCell>{serial.warrantyStatus ? 'Còn bảo hành' : 'Không có bảo hành'}</TableCell>
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
        </div>
      )}

      {tabIndex === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Thêm sản phẩm mới</h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Trạng thái bảo hành</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serialData.map((serial, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{serial.productName} {serial?.inch.replace(' inch', 'in')}</TableCell>
                  <TableCell>{serial.serialNumber}</TableCell>
                  <TableCell>{serial?.inch}</TableCell>
                  <TableCell>{serial.warrantyStatus ? 'Còn bảo hành' : 'Không có bảo hành'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenAddSerial(serial)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedProduct && (
        <AddSerial product={selectedProduct} open={openAddSerial} onClose={handleCloseAddSerial} refresh={fetchSerialData} />
      )}
    </React.Fragment>
  );
}
