import ProtectedRoute from "../components/protectedRoute";
import ManagerDashboardLayout from "../components/Dashboard/ManagerDashboardLaydout";
import ManageProduct from "../components/Dashboard/ManageProduct/ManageProduct";
import CreateOrder from "../components/Dashboard/ManageOrder/CreateOrder";
import EditOrder from "../components/Dashboard/ManageOrder/EditOrder";
import MyProfile from "../components/Dashboard/MyProfile/MyProfile";
import ManageOrder from "../components/Dashboard/ManageOrder/ManageOrder";
import ManageSerial from "../components/Dashboard/ManageSerial/ManageSerial";

const managerRoutes = [
  {
    path: "/manager",
    element: <ManagerDashboardLayout />,
    children: [
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "manage-order",
        element: <ManageOrder />,
      },
      {
        path: "manage-serial",
        element: <ManageSerial/>,
      },
      {
        path: "create-order",
        element: <CreateOrder />,
      },
      {
        path: "update-order/:orderId",
        element: <EditOrder />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
];

export default managerRoutes;
