import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import ItemCard from "./ItemCard";
import OrderService from '../../services/api/OrderService';
import "./Checkout.css";
import { useAuth } from "../../contexts/authContext";


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.products);
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [billingInfo, setBillingInfo] = useState({
    userId: userInfo._id || null,
    fname: userInfo.fname || "",
    lname: userInfo.lname || "",
    address: userInfo.address || "",
    email: userInfo.email || "",
    phoneNumber: userInfo.phoneNumber || ""
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 400) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!billingInfo.fname || !billingInfo.lname || !billingInfo.phoneNumber) {
      alert('Please fill out all required fields.');
      return;
    }

    const orderData = {
      userId: billingInfo.userId || null,
      items: products.map(product => ({
        productId: product._id,
        salePrice: product.price +10000,
        saleCost: product.cost +10000,
        quantity: product.quantity,
        color: product.color || 'Unknown',
      })),
      shippingFee: shippingCharge,
      paymentMethod: paymentMethod,
      contactInfo: {
        name: `${billingInfo.fname} ${billingInfo.lname}`,
        phone: billingInfo.phoneNumber,
        email: billingInfo.email,
        address: billingInfo.address
      }
    };

    try {
      if (paymentMethod === 'Cash On Delivery') {
        await OrderService.createOrder(orderData);
        alert("Order placed successfully!");
        dispatch(resetCart());
        navigate("/order-history");
      }else if (paymentMethod === 'PayPal') {
        alert("Payment method not supported yet.");
      }else if (paymentMethod === 'Credit Card') {
        alert("Payment method not supported yet.");
      }else if (paymentMethod === 'PayOS') {
        const  paymentUrlData  = await OrderService.createOrderPayOS(orderData);
        console.log("payment:",  paymentUrlData.paymentLink);
        window.location.href = paymentUrlData.paymentLink;
      }else if (paymentMethod === 'VnPay') {
        const paymentUrlData = await OrderService.createPaymentUrl({ ...orderData});
        // dispatch(resetCart());
        window.location.href = paymentUrlData.vnpUrl; // Redirect to VNPay for payment
      }
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <Breadcrumbs title="Checkout" />
      {products.length > 0 ? (
        <div className="checkout-content">
          <div className="checkout-left">
            <div className="billing-details">
              <h2>Thông tin giao hàng</h2>
              {!isUserLoggedIn && (
                <p>Bạn đã có tài khoản? <Link to="/signin">Đăng nhập</Link></p>
              )}
              <form className="billing-form">
                <input
                  type="text"
                  name="fname"
                  value={billingInfo.fname}
                  onChange={handleInputChange}
                  placeholder="Họ"
                />
               <input
                  type="text"
                  name="lname"
                  value={billingInfo.lname}
                  onChange={handleInputChange}
                  placeholder="Tên"
                />
                <input
                  type="email"
                  name="email"
                  value={billingInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={billingInfo.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                />
                 <input
                  type="text"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ cụ thể"
                />
              </form>
            </div>
            {/* <div className="shipping-method">
              <h2>Phương thức vận chuyển</h2>
              <p>Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
            </div> */}
            <div className="payment-method">
              <h2>Phương thức thanh toán</h2>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Cash On Delivery"
                  checked={paymentMethod === 'Cash On Delivery'}
                  onChange={() => setPaymentMethod('Cash On Delivery')}
                />
                <label>Thanh toán khi nhận phòng</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="VnPay"
                  checked={paymentMethod === 'VnPay'}
                  onChange={() => setPaymentMethod('VnPay')}
                />
                <label>Thanh toán qua VNPay</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={() => setPaymentMethod('PayPal')}
                />
                <label>Thanh toán qua PayPal</label>
              </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="PayOS"
                    checked={paymentMethod === 'PayOS'}
                    onChange={() => setPaymentMethod('PayOS')}
                  />
                  <label>Thanh toán qua PayOS</label>
                  </div>
            </div>
          </div>
          <div className="checkout-right">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {products.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
              <div className="order-total">
                <p>Khách hàng thân thiết</p>
                <p>Tạm tính: <span>${totalAmt}</span></p>
                <p>Phí vận chuyển: <span>${shippingCharge}</span></p>
                <p>Tổng cộng: <span>${totalAmt + shippingCharge}</span></p>
              </div>
              <div className="discount-code">
                <input type="text" placeholder="Mã giảm giá" />
                <button>Sử dụng</button>
              </div>
              <button onClick={handlePlaceOrder} className="place-order-btn">
                Hoàn tất đơn hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="empty-cart"
        >
          <div className="empty-cart-content">
            <h1>Giỏ hàng của bạn rỗng.</h1>
            <p>Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Tiếp tục mua sắm để tìm những món hàng tuyệt vời.</p>
            <Link to="/shop">
              <button className="continue-shopping-btn">
              Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Checkout;
