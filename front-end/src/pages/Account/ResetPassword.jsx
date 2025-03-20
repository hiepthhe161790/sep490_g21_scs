import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAuth, checkActionCode, confirmPasswordReset } from "firebase/auth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(null); // null -> đang kiểm tra, true -> hợp lệ, false -> không hợp lệ

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      const auth = getAuth();

      // Kiểm tra mã hành động có hợp lệ không
      checkActionCode(auth, code)
        .then(() => {
          setOobCode(code);
          setIsCodeValid(true);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-action-code") {
            setErrorMsg(
              "Yêu cầu đặt lại mật khẩu của bạn đã hết hạn hoặc liên kết đã được sử dụng. Vui lòng thử yêu cầu lại."
            );
          }
          if (error.code === "auth/expired-action-code") {
            setErrorMsg(
              "Yêu cầu đặt lại mật khẩu của bạn đã hết hạn hoặc liên kết đã được sử dụng. Vui lòng thử yêu cầu lại."
            );
          }
          else {
            setErrorMsg("Đã xảy ra lỗi: " + error.message);
          }
          setIsCodeValid(false);
        });
    } else {
      setErrorMsg("Liên kết không hợp lệ hoặc đã hết hạn.");
      setIsCodeValid(false);
    }
  }, [searchParams]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMsg("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!password || !confirmPassword) {
      setErrorMsg("Vui lòng nhập đầy đủ mật khẩu.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp.");
      return;
    }

    const auth = getAuth();

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccessMsg(
        "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới."
      );
    } catch (error) {
      setErrorMsg("Có lỗi xảy ra: " + error.message);
    }
  };

  if (isCodeValid === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Đang kiểm tra liên kết...</p>
      </div>
    );
  }

  if (isCodeValid === false) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{errorMsg}</p>
          <Link to="/forgot-password">
            <button className="mt-4 bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer px-4 py-2 rounded-md duration-300">
              Thử đặt lại mật khẩu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-1/2 h-full ">
        <div className="px-6 py-4 w-full lgl:w-[450px] h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Đặt lại mật khẩu
            </h1>
            <div className="flex flex-col gap-1">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Mật khẩu mới
              </p>
              <input
                onChange={handlePasswordChange}
                value={password}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Xác nhận mật khẩu mới
              </p>
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                <span className="font-bold italic mr-1">!</span>
                {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="text-sm text-green-500 font-titleFont font-semibold px-4">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
            >
              Đặt lại mật khẩu
            </button>

            <p className="text-sm text-center font-titleFont font-medium">
              Nhớ mật khẩu rồi?{" "}
              <Link to="/signin">
                <span className="hover:text-blue-600 duration-300">
                  Đăng nhập
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
