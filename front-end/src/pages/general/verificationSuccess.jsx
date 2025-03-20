import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#000000',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
    },
});

const VerificationSuccess = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useAuth();
    const [count, setCount] = useState(5);

    useEffect(() => {
        document.title = "Hà Chính LCD | Xác Thực Thành Công";
        const intervalId = setInterval(() => {
            setCount(prev => {
                if (prev === 1) {
                    clearTimeout(intervalId);
                    navigate('/');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    useEffect(() => {
        if (isUserLoggedIn) {
            const signOut = async () => {
                await doSignOut();
            }
            signOut();
        }
    }, [isUserLoggedIn]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                }}
            >
                <Card sx={{ textAlign: 'center', padding: 3, bgcolor: '#f5f5f5', color: 'text.primary' }}>
                    <CardContent>
                        <CheckCircleIcon sx={{ fontSize: 100, color: 'secondary.main', marginBottom: 2 }} />
                        <Typography variant="h4" component="div">
                            Xác thực thành công!
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 2 }}>
                            Chào mừng bạn đến với hệ thống đặt bàn nhà hàng Hà Chính LCD.
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            Trở về trang chủ sau {count} giây.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};

export default VerificationSuccess;
