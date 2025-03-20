import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../services/api/OrderService';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import { toast } from 'react-toastify';
const VnpayReturnHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCalled = useRef(false); // Use useRef to control API calls
    useEffect(() => {
        if (isCalled.current) return; // Prevent calling the API again
        isCalled.current = true;
        const handleVnpayReturn = async () => {
            const queryParams = window.location.search.substring(1); // Get the query string without the leading '?'
            try {
                const response = await OrderService.vnpayReturnUrl(queryParams);

                if (response === 'Payment successful') {
                    toast.success('Payment successful!');
                    dispatch(resetCart());
                    // Redirect to the order details page or any other page
                    navigate('/order-history');
                } else {
                    toast.error('Payment failed!');
                    navigate('/cart')
                }
            } catch (error) {
                console.error('Error handling VNPay return:', error?.message);
               toast.error('An error occurred while processing your payment.');
            }
        };

        handleVnpayReturn();
    }, [navigate]);

    return (
        <div>
            <Typography variant="h1" align="center">
               <div> Processing Payment...</div>
            </Typography>

        </div>
    );
};

export default VnpayReturnHandler;
