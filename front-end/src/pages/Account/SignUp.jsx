import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserService from '../../services/userService';
import NotificationSnackbar from '../../components/snackbars/notificationSnackbar';
import LoadingOverlay from "../../components/general/loadingOverlay";
import { useAuth } from "../../contexts/authContext";
import { BsCheckCircleFill } from "react-icons/bs";
import { logoLight } from "../../assets/images";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { isUserLoggedIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  // const [showThank, setShowThank] = useState(false);
  const [noticeContent, setNoticeContent] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("MALE");
  const [successMsg, setSuccessMsg] = useState("");
  const [errFName, setErrFName] = useState("");
  const [errLName, setErrLName] = useState("");
  const [errDob, setErrDob] = useState("");
  const [errGender, setErrGender] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    if (checked) {
      if (!firstName) {
        setErrFName("Enter your first name");
      }
      if (!lastName) {
        setErrLName("Enter your last name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!dob) {
        setErrDob("Enter your date of birth");
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      if (!address) {
        setErrAddress("Enter your address");
      }
      if (!gender) {
        setErrGender("Gender not empty");
      }
      if (
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        address
      ) {
        if (!isUserLoggedIn) {
          setLoading(true);
          try {
            const filter = {
              fname: firstName,
              lname: lastName,
              dob,
              phoneNumber: phone,
              email,
              gender,
              password
            }
            await UserService.registerCustomerAccount(filter);
            setLoading(false);
            setSuccessMsg(
              `Hello dear ${firstName} ${lastName}, Welcome you to HÀ CHÍNH LCD Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
            );
            // setShowThank(true);

          } catch (error) {
            setShowNotice(true);
            setNoticeContent(error.message);
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <LoadingOverlay open={loading}></LoadingOverlay>
      <NotificationSnackbar open={showNotice} setOpen={setShowNotice} message={noticeContent} severity={'error'}></NotificationSnackbar>

      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with HÀ CHÍNH LCD
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all HÀ CHÍNH LCD services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © HÀ CHÍNH LCD
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
      {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
              Tạo tài khoản của bạn
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  {/* First Name */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Họ</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border p-2 rounded"
                      placeholder="First Name"
                    />
                    {errFName && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errFName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Tên</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border p-2 rounded"
                      placeholder="Last Name"
                    />
                    {errLName && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errLName}
                      </p>
                    )}
                  </div>
                </div>


                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="eg. example@email.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  {/* Date of Birth */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Ngày sinh</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    {errDob && (
                      <p className="text-sm text-red-500 font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errDob}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                      onChange={handlePhone}
                      value={phone}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border border-gray-400 outline-none"
                      type="number"
                      placeholder="Phone number"
                    />
                    {errPhone && (
                      <p className="text-sm text-red-500 font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errPhone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Mật khẩu
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Địa chỉ
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Address"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>
                {/* Gender */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Giới tính
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="MALE"
                        checked={gender === "MALE"}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2"
                      />
                      Nam
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="FEMALE"
                        checked={gender === "FEMALE"}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2"
                      />
                      Nữ
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="OTHER"
                        checked={gender === "OTHER"}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2"
                      />
                      Khác
                    </label>
                  </div>
                  {errGender && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errGender}
                    </p>
                  )}
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                  Tôi đồng ý với HÀ CHÍNH LCD{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                {errorMsg && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errorMsg}
                  </p>
                )}
                <button
                  onClick={handleSignUp}
                  className={`${checked
                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                    } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Tạo tài khoản
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                Bạn đã có tài khoản?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng nhập
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
