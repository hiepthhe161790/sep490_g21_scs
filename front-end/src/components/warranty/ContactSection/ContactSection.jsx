import React from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';

const contactData = [
  { title: 'Ứng Dụng Hà Chính LCD Members', description: 'Ứng dụng cung cấp hỗ trợ và thông tin.', buttonText: 'Tìm hiểu thêm', link: '#' },
  { title: 'Tìm Trung Tâm Bảo Hành', description: 'Tìm kiếm trung tâm bảo hành gần nhất.', buttonText: 'Tìm kiếm', link: '#' },
  { title: 'Chăm sóc Khách hàng', description: 'Liên hệ tổng đài hỗ trợ.', buttonText: 'Liên hệ ngay', link: '#' },
  { title: 'Cửa Hàng Trực Tuyến', description: 'Mua sắm trực tiếp từ Hà Chính LCD.', buttonText: 'Mua sắm ngay', link: '#' },
];

const ContactSection = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 4, textAlign: 'center' }}>Hỗ Trợ & Liên Hệ</Typography>
      <Grid container spacing={3} justifyContent="center">
        {contactData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>{item.description}</Typography>
                  <Button variant="contained" color="primary" href={item.link} target="_blank">{item.buttonText}</Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ContactSection;