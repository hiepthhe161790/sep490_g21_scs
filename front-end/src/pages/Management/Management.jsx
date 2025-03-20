import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
const Management = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <SideBar />
            <div className="flex flex-col flex-grow w-full">
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
                <div className="flex-grow p-4 md:p-12 overflow-y-auto w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Management;
