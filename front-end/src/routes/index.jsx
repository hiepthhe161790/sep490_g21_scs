import { createBrowserRouter } from "react-router-dom";
import RoleBasedLayout from "../layouts/roleBasedLayout";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import managerRoutes from "./managerRoutes";
import authRoutes from "./authRoutes";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import managementRoutes from "./managementRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedLayout />,
    children: [...publicRoutes, ...managerRoutes, ...adminRoutes],
  },
  ...authRoutes, ...managementRoutes,
  { path: "*", element: <ErrorPage /> },
]);

export default router;
