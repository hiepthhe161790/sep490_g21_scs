import icon_dashboard from "../../assets/images/sidebar-icons/icons8-dashboard-96.png"
import icon_user_settings from "../../assets/images/sidebar-icons/icons8-user-settings-64.png"
import icon_user_group from "../../assets/images/sidebar-icons/icons8-user-groups-96.png"
import icon_supplier from "../../assets/images/sidebar-icons/icons8-supplier-60.png"
import icon_repair from "../../assets/images/sidebar-icons/icons8-repair-96.png"
import icon_list from "../../assets/images/sidebar-icons/icons8-list-64.png"
import icon_send_part from "../../assets/images/sidebar-icons/icons8-send-production-order-80.png"
import icon_tv from "../../assets/images/sidebar-icons/icons8-tv-94.png"
import icon_screw from "../../assets/images/sidebar-icons/icons8-screw-64.png"

import logo from "../../assets/images/HaChinhLCDLogo.png"
import { NavLink } from "react-router-dom"

const SideBar = () => {

    const SIDEBAR_LINKS = [
        { id: 1, name: "Dashboard", icon: icon_dashboard, link: "dashboard" },
        { id: 2, name: "Người dùng", icon: icon_user_settings, link: "account" },
        { id: 3, name: "Nhóm khách hàng", icon: icon_user_group, link: "customer-group" },
        { id: 4, name: "Nhà cung cấp", icon: icon_supplier, link: "supplier" },
        { id: 5, name: "Yêu Cầu Sửa chữa", icon: icon_repair, link: "repair-request" },
        { id: 6, name: "Danh Sách Công Việc", icon: icon_list, link: "workload" },
        { id: 7, name: "Yêu Cầu Linh Kiện", icon: icon_send_part, link: "part-request" },
        { id: 8, name: "Quản Lý TV", icon: icon_tv, link: "tv" },
        { id: 9, name: "Quản Lý Linh Kiện", icon: icon_screw, link: "part" },
    ]

    return (
        <div className="bg-sky-300 shadow-lg z-10 h-screen">
            <div className="flex justify-center">
                <img src={logo} alt="logo" className="w-16 md:w-36" />
            </div>
            <div>
                {SIDEBAR_LINKS.map((item) => (
                    <NavLink key={item.id} to={item.link}
                        className={({ isActive }) => isActive ? "flex justify-center md:justify-start md:space-x-4 items-center p-4 bg-sky-400 text-white"
                            : "flex justify-center md:justify-start md:space-x-4 items-center p-4 hover:bg-sky-400 hover:text-white"}
                    >
                        <img src={item.icon} alt={item.name} className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="text-sm hidden md:block">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>

    )
}

export default SideBar