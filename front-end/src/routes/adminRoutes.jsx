import ProtectedRoute from "../components/protectedRoute";
import UserList from "../pages/admin/user/UserList";
import ListGroupCustomer from "../pages/admin/groupCustomer/ListGroupCustomer";
const adminRoutes = [
  {
    path: "/admin/user-list",
    element: (
      // <ProtectedRoute requiredRoles={["ADMIN"]}>
      <ProtectedRoute>
        <UserList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/groupCustomer-list",
    element: (
      // <ProtectedRoute requiredRoles={["ADMIN"]}>
      <ProtectedRoute>
        <ListGroupCustomer />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
