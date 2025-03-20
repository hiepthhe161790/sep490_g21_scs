
import Management from '../pages/Management/Management.jsx';
import Dashboard from '../pages/Management/Dashboard/Dashboard.jsx';
import Account from '../pages/Management/Account/Account.jsx';
import CustomerGroup from '../pages/Management/CustomerGroup/CustomerGroup.jsx';
import Supplier from '../pages/Management/Supplier/Supplier.jsx';
import RepairRequest from '../pages/Management/RepairRequest/RepairRequest.jsx';
import Workload from '../pages/Management/Workload/Workload.jsx';
import PartRequest from '../pages/Management/PartRequest/PartRequest.jsx';
import TV from '../pages/Management/TV/TV.jsx';
import Part from '../pages/Management/Part/Part.jsx';
const managementRoutes = [
    {

        path: "/management",
        element: <Management />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "account",
                element: <Account />
            },
            {
                path: "customer-group",
                element: <CustomerGroup />
            },
            {
                path: "supplier",
                element: <Supplier />
            },
            {
                path: "repair-request",
                element: <RepairRequest />
            },
            {
                path: "workload",
                element: <Workload />
            },
            {
                path: "part-request",
                element: <PartRequest />
            },
            {
                path: "tv",
                element: <TV />
            },
            {
                path: "part",
                element: <Part />
            },
        ],
    },
];

export default managementRoutes;
