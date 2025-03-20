import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import NotificationSnackbar from '../../components/snackbars/notificationSnackbar';
import LoadingOverlay from '../../components/general/loadingOverlay';
import UserService from '../../services/userService';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openNotification, setOpenNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState('');
  const [severityNotification, setSeverityNotification] = useState('info');
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorMsg("");
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Enter your email");
    } else {
      if (email.trim().length === 0) {
        setSeverityNotification("error");
        setMessageNotification("Không được để trống Email!");
        setOpenNotification(true);
        return;
    }
    setIsLoading(true);
    try {
        await UserService.resetPassword(email);
        setSeverityNotification('success');
        setMessageNotification("Chúng tôi đã gửi vào email của bạn, hãy kiểm tra!");
        setOpenNotification(true);
        setIsLoading(false);
    } catch (error) {
        setSeverityNotification('error');
        setMessageNotification(error?.response?.data?.message || error.message);
        setOpenNotification(true);
        setIsLoading(false);
    }
    return;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
     <LoadingOverlay open={isLoading}></LoadingOverlay>
     <NotificationSnackbar open={openNotification} setOpen={setOpenNotification} message={messageNotification} severity={severityNotification}></NotificationSnackbar>
      <div className="w-full lgl:w-1/2 h-full">
        <div className="px-6 py-4 w-full lgl:w-[450px] h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-3">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Forgot Password
            </h1>
            <div className="flex flex-col gap-1">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Work Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="email"
                placeholder="john@workemail.com"
              />
              {errorMsg && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errorMsg}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
            {successMsg && (
              <p className="mb-4 font-medium text-sm text-green-600">
                {successMsg}
              </p>
            )}
            <p className="text-sm text-center font-titleFont font-medium">
              Remembered your password?{" "}
              <Link to="/signin">
                <span className="hover:text-blue-600 duration-300">
                  Sign in
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
