import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SecurityIcon from "@mui/icons-material/Security";
import AppsIcon from "@mui/icons-material/Apps";
import ScheduleIcon from "@mui/icons-material/Schedule";
import bannerImage from '../../assets/images/banner/KV_pc.jpg';
import { NavLink, Outlet } from "react-router-dom";

const Container = styled(Box)({
  background: "#222",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  padding: "10px 0",
});

const tabItems = [
  {
    label: "Sản phẩm của tôi", icon: <PhoneAndroidIcon />, link: "register-repair",
    title: "Đăng ký sửa chữa thiết bị của bạn",
    subTitle: "Đăng ký và quản lý thiết bị của bạn, nhận các mẹo và thủ thuật hữu ích trong quá trình sử dụng."
  },
  // { label: "Yêu cầu tư vấn", icon: <AssignmentTurnedInIcon />, content: "Trang Yêu cầu tư vấn" },
  // { label: "Đặt hẹn (Thiết bị di động)", icon: <EventAvailableIcon />, content: "Trang Đặt hẹn" },
  {
    label: "Tình trạng sửa chữa", icon: <SecurityIcon />, link: "track-repair",
    title: "Tình trạng sửa chữa",
    subTitle: "Bạn có thể tìm thấy tất cả yêu cầu sửa chữa tại đây. Vui lòng chọn thiết bị để xem chi tiết."
  },
  {
    label: "Thời hạn bảo hành", icon: <ScheduleIcon />, link: "check-warranty",
    title: "Công cụ kiểm tra thời gian bảo hành",
    subTitle: "Kiểm tra tình trạng bảo hành của thiết bị."
  },
  {
    label: "Hỗ trợ Hà Chính LCD", icon: <AppsIcon />, link: "service-support",
    title: "Hỗ trợ người dùng",
    subTitle: "Tìm kiếm hỗ trợ từ Hà Chính CLD"
  },
];

const NavigationBar = () => {

  return (
    <>
      <div className="max-w-container mx-auto px-4">
        <Box
          sx={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            paddingLeft: "20px",
          }}
        >
        </Box>
        <Container className="space-x-8">
          {tabItems.map((item, index) => {
            return (
              <NavLink key={index} to={item.link} className={({ isActive }) =>
                isActive ? "text-white border-b-2" : "text-gray-400"
              }>
                <div className="flex flex-col justify-center items-center gap-1">
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </div>
              </NavLink>
            )
          })}
        </Container>
        <Outlet />
      </div>
    </>

  );
};

export default NavigationBar;
