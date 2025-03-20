import { Container, Typography, Button, Grid, Tabs, Tab, Box, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TvIcon from '@mui/icons-material/Tv';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { useState } from 'react';
import ServiceCard from '../../components/serviceCard/ServiceCard';
import bannerImage from '../../assets/images/banner/KV_pc.jpg'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#000', 
    },
  },
});

function WarrantyCenterPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
        {/* Banner */}
        <Box sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', 
          textAlign: 'center', 
          color: 'white',
          paddingLeft: '20px',
        }}>
          <Typography variant="h3" fontWeight="bold">Trung tâm bảo hành Hà Chính LCD</Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', marginTop: 1 }}>
            Tất cả trung tâm bảo hành ủy quyền Hà Chính LCD trên toàn quốc đều được đào tạo và chỉ sử dụng linh kiện chính hãng Hà Chính LCD trong mọi hoạt động sửa chữa.
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Button variant="outlined" sx={{ marginRight: 2, color:'white', borderColor: 'white' }} onClick={ () => navigate('/your-service') }>ĐẶT HẸN LỊCH SỬA CHỮA</Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} onClick={ ()=> navigate('/warranty') }>GIAO NHẬN TẬN NƠI (ĐIỆN THOẠI)</Button>
          </Box>
        </Box>

        {/* Dịch vụ bảo hành */}
        <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 4, marginBottom: 2 }}>
          Dịch vụ bảo hành ủy quyền
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <ServiceCard
              icon={<PhoneIphoneIcon />}
              title="Thiết bị di động"
              description="Tất cả sản phẩm di động sẽ được bảo hành tại trung tâm bảo hành Hà Chính LCD trên toàn quốc."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceCard
              icon={<TvIcon />}
              title="TV"
              description="Bảo hành tại nhà khách hàng cho tất cả sản phẩm TV."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceCard
              icon={<KitchenIcon />}
              title="Thiết bị gia dụng"
              description="Bảo hành/sửa chữa tủ lạnh Hà Chính LCD và máy giặt tại nhà cho khách hàng."
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 4 }}>
          Tìm Trung tâm bảo hành
        </Typography>

        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ marginTop: 2, marginBottom: 3 }}>
          <Tab label="THIẾT BỊ DI ĐỘNG" />
          <Tab label="TV & AV & MÀN HÌNH HIỂN THỊ" />
          <Tab label="THIẾT BỊ GIA DỤNG" />
          <Tab label="MÀN HÌNH MÁY TÍNH & LINH KIỆN / MÁY IN LASER & ĐA NĂNG" />
          <Tab label="Ổ CỨNG & THẺ NHỚ" />
        </Tabs>

        {/* Nội dung tab */}
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {tabIndex === 0 && "Bạn đã chọn tab 'THIẾT BỊ DI ĐỘNG'."}
          {tabIndex === 1 && "Bạn đã chọn tab 'TV & AV & MÀN HÌNH HIỂN THỊ'."}
          {tabIndex === 2 && "Bạn đã chọn tab 'THIẾT BỊ GIA DỤNG'."}
          {tabIndex === 3 && "Bạn đã chọn tab 'MÀN HÌNH MÁY TÍNH & LINH KIỆN / MÁY IN LASER & ĐA NĂNG'."}
          {tabIndex === 4 && "Bạn đã chọn tab 'Ổ CỨNG & THẺ NHỚ'."}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default WarrantyCenterPage;