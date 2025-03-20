import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import SpecialCase from "../components/SpecialCase/SpecialCase";
import { ScrollRestoration, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
const CustomerLayout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default CustomerLayout;