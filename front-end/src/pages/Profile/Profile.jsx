import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import { useAuth } from "../../contexts/authContext";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const { isUserLoggedIn } = useAuth();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const switchToPasswordChange = () => {
    setIsChangePassword(true);
    setIsModalOpen(true);
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
       Thông tin cá nhân
      </Typography>
      {isUserLoggedIn && <UpdateProfile />}
      <Button onClick={switchToPasswordChange} variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
        Đổi mật khẩu
      </Button>

      <Dialog open={isModalOpen} onClose={toggleModal}>
        <DialogTitle>{isChangePassword ? 'Change Password' : 'Update Profile'}</DialogTitle>
        <DialogContent>
          {isChangePassword ? <ChangePassword toggleModal={toggleModal} /> : <UpdateProfile />}
        </DialogContent>
        <DialogActions>
          {isChangePassword ? (
            <>
              {/* <Button onClick={switchToProfileUpdate} color="primary">
                Update Profile
              </Button>
              <Button onClick={toggleModal} color="primary" form="changePasswordForm" type="submit">
                Change Password
              </Button> */}
            </>
          ) : (
            <>
              <Button onClick={switchToPasswordChange} color="primary">
                Thay đổi mật khẩu
              </Button>
              <Button color="primary" form="updateProfileForm" type="submit">
                Cập nhật thông tin
              </Button>
            </>
          )}
          <Button onClick={toggleModal} color="secondary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;