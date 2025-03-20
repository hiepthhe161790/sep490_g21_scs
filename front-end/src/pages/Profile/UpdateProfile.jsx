import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { toast } from 'react-toastify';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import UserService from '../../services/userService';

const UpdateProfile = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, refreshUserData } = useAuth();
  console.log('currentUser:', currentUser.email);
  useEffect(() => {
    if (currentUser) {
      setFName(currentUser.fname || '');
      setLName(currentUser.lname || '');
      setDob(currentUser.dob ? new Date(currentUser.dob).toISOString().split('T')[0] : '' || '');
      setGender(currentUser.gender || '');
      setPhoneNumber(currentUser.phoneNumber || '');
      setAddress(currentUser.address || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { fname: fName, lname: lName, dob, gender, phoneNumber, address };
    // console.log('profileData:', profileData);
    try {
      // console.log('currentUser?.email:', currentUser?.email);
      await doSignInWithEmailAndPassword(currentUser?.email, password);
      await UserService.updateCustomerInfo(profileData);
      await refreshUserData();
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/invalid-credential') {
        toast.error('Mật khẩu không chính xác!');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <TextField
        label="Email (Không thể thay đổi)"
        value={currentUser?.email || ''}
        fullWidth
        margin="normal"
        disabled
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Họ"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tên"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Ngày sinh"
            type="date"
            value={dob || ''}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <TextField
        label="Địa chỉ cụ thể"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Giới tính</FormLabel>
        <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
          <FormControlLabel value="MALE" control={<Radio />} label="Name" />
          <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
          <FormControlLabel value="OTHER" control={<Radio />} label="Khác" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="Nhập mật khẩu để xác nhận"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Cập nhật
      </Button>
    </Box>
  );
}

export default UpdateProfile;