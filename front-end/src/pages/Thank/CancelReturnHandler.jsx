import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../services/api/OrderService';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import { toast } from 'react-toastify';

const CancelReturnHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCalled = useRef(false); // Dùng useRef để kiểm soát việc gọi API

    useEffect(() => {
        if (isCalled.current) return; // Ngăn gọi lại API lần 2
        isCalled.current = true;

        const handlePayOSReturn = async () => {
            const queryParams = window.location.search.substring(1);
            try {
                const response = await OrderService.handlePayOSCallback(queryParams);
                if (response === 'Payment failed') {
                    toast.error('Payment failed!');
                    navigate('/cart');
                } else {
                    dispatch(resetCart());
                    toast.success('Payment successful!');
                }
            } catch (error) {
                console.error('Error handling PayOS return:', error?.message);
                toast.error('An error occurred while processing your payment.');
            }
        };

        handlePayOSReturn();
    }, [navigate, dispatch]);

    return (
        <div>
            <Typography variant="h1" align="center">
                <div> Processing Payment...</div>
            </Typography>
        </div>
    );
};

export default CancelReturnHandler;
