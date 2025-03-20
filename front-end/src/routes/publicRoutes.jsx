import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Journal from "../pages/Journal/Journal";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/payment/Payment";
import WarrantyContactPage from "../pages/Warranty/Warranty";
import WarrantyCenterPage from "../pages/WarrantyCenterPage/WarrantyCenterPage";
import VnpayReturnHandler from "../pages/Thank/VnpayReturnHandler";
import PayOSReturnHandler from "../pages/Thank/PayOSReturnHandler";
import CancelReturnHandler from "../pages/Thank/CancelReturnHandler";
import MyOrders from "../pages/MyOrder/MyOrders";
import Profile from "../pages/Profile/Profile";
import NavigationBar from "../pages/YourService/NavigationBar";
import RegisterRepair from "../pages/YourService/RegisterRepair/RegisterRepair";
import TrackRepair from "../pages/YourService/TrackRepair/TrackRepair";
import CheckWarranty from "../pages/YourService/CheckWarranty/CheckWarranty";
import ServiceSupport from "../pages/YourService/ServiceSupport/ServiceSupport";
import { Navigate } from "react-router-dom";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Shop /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/journal", element: <Journal /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/product/:_id", element: <ProductDetails /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/paymentgateway", element: <Payment /> },
  { path: "/vnpay_return_url", element: <VnpayReturnHandler /> },
  { path: "/success", element: <PayOSReturnHandler /> },
  { path: "/cancel", element: <CancelReturnHandler /> },
  { path: "/order-history", element: <MyOrders /> },
  { path: "/profile", element: (<Profile />) },
  { path: "/warranty", element: <WarrantyContactPage /> },
  { path: "/warrantyCenter", element: <WarrantyCenterPage /> },
  {
    path: "/your-service",
    element: <NavigationBar />,
    children: [
      { path: "", element: <Navigate to="register-repair" replace /> },
      { path: "register-repair", element: <RegisterRepair /> },
      { path: "track-repair", element: <TrackRepair /> },
      { path: "check-warranty", element: <CheckWarranty /> },
      { path: "service-support", element: <ServiceSupport /> }
    ]
  },
];

export default publicRoutes;
