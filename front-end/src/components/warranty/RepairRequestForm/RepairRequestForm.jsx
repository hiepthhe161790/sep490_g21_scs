import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

function RepairRequestForm() {
  const [serial, setSerial] = useState('');
  const [model, setModel] = useState('');
  const [isSerialValid, setIsSerialValid] = useState(null);
  const [isModelValid, setIsModelValid] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // State riêng lẻ cho form
  const [issue, setIssue] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({});

  // Danh sách serial và model hợp lệ
  const validSerials = ['SER123456', 'SER789012'];
  const validModels = ['MODEL_A', 'MODEL_B'];

  const checkSerial = () => {
    let newErrors = { ...errors };
    if (!serial.trim()) {
      setIsSerialValid(false);
      newErrors.serial = 'Vui lòng nhập Serial';
    } else if (validSerials.includes(serial.trim())) {
      setIsSerialValid(true);
      setShowForm(true);
      delete newErrors.serial;
    } else {
      setIsSerialValid(false);
      newErrors.serial = 'Không tìm thấy thiết bị. Nhập Model để kiểm tra tiếp.';
    }
    setErrors(newErrors);
  };

  const checkModel = () => {
    let newErrors = { ...errors };
    if (!model.trim()) {
      setIsModelValid(false);
      newErrors.model = 'Vui lòng nhập Model';
    } else if (validModels.includes(model.trim())) {
      setIsModelValid(true);
      setShowForm(true);
      delete newErrors.model;
    } else {
      setIsModelValid(false);
      newErrors.model = 'Thiết bị không hỗ trợ.';
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!issue.trim()) newErrors.issue = 'Vui lòng nhập vấn đề';
    if (!name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Yêu cầu sửa chữa đã gửi', { issue, name, phone, email, address });
    alert('Yêu cầu sửa chữa đã được gửi thành công!');
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Đăng ký yêu cầu sửa chữa
        </Typography>

        {!showForm && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body1">Nhập Serial để quét thiết bị:</Typography>
            <TextField
              fullWidth
              label="Serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              error={!!errors.serial}
              helperText={errors.serial}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={checkSerial} sx={{ marginBottom: 2 }}>
              Kiểm tra Serial
            </Button>

            {isSerialValid === false && (
              <>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Nhập Model để quét thiết bị:
                </Typography>
                <TextField
                  fullWidth
                  label="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  error={!!errors.model}
                  helperText={errors.model}
                  sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={checkModel} sx={{ marginBottom: 2 }}>
                  Kiểm tra Model
                </Button>
              </>
            )}
          </Box>
        )}

        {showForm && (
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Thông tin vấn đề & Khách hàng
            </Typography>
            <TextField
              fullWidth
              label="Vấn đề"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              error={!!errors.issue}
              helperText={errors.issue}
              sx={{ marginBottom: 2 }}
            />
            <TextField       
              fullWidth
              label="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ marginBottom: 2 }}
            />
            <TextField   
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ marginBottom: 3 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Gửi yêu cầu sửa chữa
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default RepairRequestForm;