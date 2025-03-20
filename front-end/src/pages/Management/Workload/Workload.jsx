import { FaEye } from "react-icons/fa";
import { useMediaQuery, MenuItem, FormControl, Select, OutlinedInput } from "@mui/material";
import { useState } from "react";
import WorkDetailModal from "./WorkDetailModal";

const Workload = () => {

    const [workStatus, setWorkStatus] = useState({
        id: 0,
        name: "Tất cả"
    })

    const [openDetailModal, setOpenDetailModal] = useState(false);
    const handleOpenDetailModal = () => setOpenDetailModal(true);
    const handleCloseDetailModal = () => setOpenDetailModal(false);

    const WORK_STATUS = [
        { id: 0, name: "Tất cả" },
        { id: 1, name: "Chờ xử lý" },
        { id: 2, name: "Đang sửa" },
        { id: 3, name: "Hoàn thành" },
        { id: 4, name: "Không thể sửa" }
    ]

    const isMobile = useMediaQuery('(max-width:768px)');

    const handleChangeWorkStatus = (event) => {
        const workStatus = WORK_STATUS.find((item) => item.id === event.target.value);
        console.log(workStatus);
        setWorkStatus(workStatus);
    };



    return (
        <>
            <div className="w-full px-1 md:px-2">
                <FormControl size="small" >
                    <Select
                        value={workStatus.id}
                        displayEmpty
                        onChange={handleChangeWorkStatus}
                        input={<OutlinedInput sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }} />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        className=""
                    >
                        {WORK_STATUS.map((item, index) => {
                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className="mt-1">
                    <table className="text-sm text-left w-full">
                        <thead className="text-[10px] md:text-sm text-black uppercase bg-sky-300">
                            <tr>
                                <th scope="col" className="px-4 md:px-6 py-3">
                                    TV CẦN SỬA
                                </th>
                                <th scope="col" className="hidden md:table-cell px-4 md:px-6 py-3">
                                    SỐ INCH
                                </th>
                                <th scope="col" className="hidden md:table-cell px-4 md:px-6 py-3">
                                    TÌNH TRẠNG TV
                                </th>
                                <th scope="col" className="hidden md:table-cell px-4 md:px-6 py-3">
                                    GHI CHÚ
                                </th>
                                <th scope="col" className="hidden md:table-cell px-4 md:px-6 py-3">
                                    TRẠNG THÁI SỬA CHỮA
                                </th>
                                <th scope="col" className="px-4 md:px-6 py-3">
                                    NGÀY GIAO
                                </th>
                                <th scope="col" className="px-4 md:px-6 py-3">
                                    CHI TIẾT
                                </th>
                                {/* <th scope="col" className="hidden md:table-cell px-4 md:px-6 py-3">

                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-sky-100 border-b border-gray-200">
                                <th scope="row" className="px-4 md:px-6 py-2 font-medium text-xs md:text-base text-gray-900 ">
                                    TV Samsung QLED QE1D 4K (QA65QE1DAKXXV)
                                </th>
                                <th scope="row" className="hidden md:table-cell px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900">
                                    65
                                </th>
                                <th scope="row" className="hidden md:table-cell px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900 ">
                                    Có âm thanh không lên hình
                                </th>
                                <th scope="row" className="hidden md:table-cell px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900  ">
                                    Kiểm tra đèn hình TV
                                </th>
                                <th scope="row" className="hidden md:table-cell px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900  ">
                                    Hoàn thành
                                </th>
                                <th scope="row" className="px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900  ">
                                    2/9/2025
                                </th>
                                <th onClick={() => handleOpenDetailModal()} scope="row" className=" px-4 md:px-6 py-4">
                                    <FaEye size={18} />
                                </th>
                                {/* <th scope="row" className="hidden md:table-cell px-4 md:px-6 py-4 font-medium text-xs md:text-base text-gray-900  ">
                                    <button className="text-blue-500">Cập nhật tiến độ</button>
                                </th> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <WorkDetailModal handleClose={handleCloseDetailModal} open={openDetailModal} />
        </>

    )
}

export default Workload