import { Button, Card, CardContent, Typography, Tabs, Tab, Box, Container, Grid, Link, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/banner/KV_pc.jpg';
import ContactSection from '../../components/warranty/ContactSection/ContactSection';
const warrantyData = [
  { title: 'Điện thoại di động / Máy tính bảng', duration: '12 tháng', type: 'Sửa chữa tại TTBH Ủy Quyền', coverage: 'Tiền công + linh kiện' },
  { title: 'Cơ cấu', duration: '12 tháng', type: 'Sửa chữa tại TTBH Ủy Quyền', coverage: 'Tiền công + linh kiện' },
  { title: 'Phụ kiện di động', duration: '3 tháng', type: 'Thay thế tại TTBH Ủy Quyền', coverage: 'Chỉ áp dụng cho phụ kiện chính hãng' },
  { title: 'Pin sạc dự phòng', duration: '6 tháng', type: 'Thay thế tại TTBH Ủy Quyền', coverage: 'Chỉ áp dụng cho sản phẩm chính hãng' },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#000', 
    },
  },
});

function WarrantyContactPage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', textAlign: 'center', mb: 4 }}>
        <img src={heroImage} alt="Bảo hành sản phẩm" style={{ width: '100%', borderRadius: 12 }} />
        <Typography variant="h3" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>
          Dịch Vụ Bảo Hành Chính Hãng
        </Typography>
      </Box>

      {/* Warranty Tabs */}
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)} centered>
        <Tab label="Điện thoại di động" />
        <Tab label="Tivi & Thiết bị nghe nhìn" />
        <Tab label="Thiết bị gia dụng" />
      </Tabs>

      {/* Warranty Cards */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {warrantyData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2">Thời hạn: {item.duration}</Typography>
                  <Typography variant="body2">Dịch vụ: {item.type}</Typography>
                  {item.coverage && <Typography variant="body2">Phạm vi: {item.coverage}</Typography>}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Contact Section */}
      <ContactSection />
    </Container>
    </ThemeProvider>
  );
}

export default WarrantyContactPage;
