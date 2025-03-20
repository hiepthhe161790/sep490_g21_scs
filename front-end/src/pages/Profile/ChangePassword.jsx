import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { doSignInWithEmailAndPassword, doUpdatePassword } from '../../firebase/auth';
import LoadingOverlay from '../../components/general/loadingOverlay';
import { useAuth } from '../../contexts/authContext';

const ChangePassword = ({ toggleModal }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, refreshUserData } = useAuth();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    setLoading(true);
    try {
      await doSignInWithEmailAndPassword(currentUser?.email, currentPassword);
      await doUpdatePassword(newPassword);
      await refreshUserData();
      toast.success('Mật khẩu đã được thay đổi thành công');
      setLoading(false);
      toggleModal();
    } catch (error) {
      toast.error('Mật khẩu hiện tại không chính xác');
      setLoading(false);
    }
  };

  return (
    <Box>
      <LoadingOverlay open={loading}></LoadingOverlay>
      <form onSubmit={handlePasswordSubmit}>
        <TextField
          label="Mật khẩu hiện tại"
          name="currentPassword"
          type="password"
          value={currentPassword}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mật khẩu mới"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Thay đổi mật khẩu
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;