import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import ForgotPassword from "../pages/Account/ForgotPassword";
import ResetPassword from "../pages/Account/ResetPassword";
import { Unauthorized, InvalidRequest, SignOut, VerificationSuccess } from '../pages/general/index'
import ProtectedRoute from "../components/protectedRoute";

const authRoutes = [
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {path: "/sign-out", element:  <SignOut />},
  {path: "/unauthorized", element: <ProtectedRoute><Unauthorized /></ProtectedRoute>},
  {path: "/invalid", element: <ProtectedRoute><InvalidRequest /></ProtectedRoute>},
  {path: "/verification-success", element: <ProtectedRoute><VerificationSuccess /></ProtectedRoute>},
];

export default authRoutes;
