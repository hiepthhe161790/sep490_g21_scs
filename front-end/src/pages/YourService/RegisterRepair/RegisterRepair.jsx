import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SerialProductService from "../../../services/api/SerialProductService"
import product_image_placeholder from "../../../assets/default-product-image.jpg"
import RepairRequestService from "../../../services/api/RepairRequestService"
import { useSelector } from "react-redux"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Divider } from "@mui/material"
import real_tv from "../../../assets/icon/real-tv-icon.jpg"
import phu_kien_tv from "../../../assets/icon/phu-kien-tv.jpg"
import plus from "../../../assets/icon/plus.png"
import { IoCaretDownSharp, IoSearchOutline } from "react-icons/io5";
import { FaAnglesRight } from "react-icons/fa6";
import { FcInfo } from "react-icons/fc";
import { PublicContext } from "../../../contexts/publicContext"
import { removeIllegalSpaceAndUpppercase } from "../../../utils/handleFormat"


const RegisterRepair = () => {

    const [openMessage, setOpenMessage] = useState(false)
    const [message, setMessage] = useState({
        severity: "",
        content: ""
    })
    const [searchSerial, setSearchSerial] = useState("")
    const [searchModel, setSearchModel] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [isOpenSearchModel, setIsOpenSearchModel] = useState(false)
    const [issue, setIssue] = useState("")
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })

    const { userInfo } = useSelector((state) => state.orebiReducer)

    const { brands, products } = useContext(PublicContext)
    const [selectedBrand, setSelectedBrand] = useState("")

    const handleAutoFillCustomerInfo = () => {
        if (userInfo?._id) {
            setCustomerInfo({
                name: userInfo?.lname + "" + userInfo?.fname,
                phone: userInfo?.phoneNumber,
                email: userInfo?.email,
                address: userInfo?.address
            })
        }
    }

    const handleCheckSerial = async () => {
        try {
            if (removeIllegalSpaceAndUpppercase(searchSerial)?.length > 8) {
                const response = await SerialProductService.checkProductSerialToRegister(searchSerial)
                if (response.status === 200) {
                    setSearchResult(response.data)
                } else {
                    setSearchResult(null)
                    setIsOpenSearchModel(true)
                }
            }
        } catch (error) {
            setSearchResult(null)
            setIsOpenSearchModel(true)
            console.log(error)
        }
    }

    const handleOpenMessage = () => {
        setOpenMessage(true);
    };

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
    };

    const handleCreateRequest = async () => {
        try {
            const response = await RepairRequestService.createRepairRequestByCustomer({
                customerId: userInfo?._id || null,
                incidentInfor: { issue: issue },
                customerInfo: customerInfo,
                products: [
                    {
                        productId: searchResult?.product?._id,
                        warrantyId: searchResult?.warranty?._id || null,
                        serialNumber: searchResult?.serial,
                        requestType: new Date() > new Date(searchResult.warranty.end_date) ? "REPAIR" : "WARRANTY"
                    }
                ],
                pay: {
                    serviceFee: 0,
                    totalAmount: 0
                }
            })
            if (response.status === 201) {
                setMessage({
                    severity: "success",
                    content: response.message
                })
            } else {
                setMessage({
                    severity: "error",
                    message: response.message || "Có lỗi xảy ra, vui lòng tải lại trang"
                })
            }
            handleOpenMessage()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {console.log(searchResult)}
            <div className="flex py-8">
                <div className="flex flex-col gap-6">
                    <h3 className="text-[1.75rem] font-semibold">Đăng ký sửa chữa cho thiết bị</h3>
                    <h5 className="text-gray-600">Đăng ký và quản lý thiết bị của bạn, nhận các mẹo và thủ thuật hữu ích trong quá trình sử dụng.</h5>
                    <div className="flex flex-col gap-5">
                        <span>Nhập số sê-ri (S/N) hoặc số IMEI của thiết bị.</span>

                        <div className="flex justify-between gap-5">
                            <input value={searchSerial}
                                onChange={(event) => {
                                    const input = event.target.value
                                    const toValidInput = input.replace(/[^a-zA-Z0-9 ]/g, '').toLocaleUpperCase();
                                    setSearchSerial(toValidInput);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleCheckSerial()
                                    }
                                }}
                                placeholder="Số Serial hoặc IMEI" className="px-4 border-b-[1px] border-gray-700 w-full focus:outline-none" />
                            <button
                                onClick={() => handleCheckSerial()}
                                className="text-semibold px-4 py-2 rounded-full border-2 border-black hover:bg-gray-200 text-nowrap">Xác Nhận</button>
                        </div>
                        {searchSerial?.length > 0 && searchSerial?.length < 8 &&
                            <div className="flex gap-2 items-center">
                                <FcInfo size={20} />
                                <span className="text-sky-600">
                                    Số Serial của thiết bị điện tử phải có từ 8 ký tự trở lên
                                </span>
                            </div>
                        }
                        <Link to={"service-support"} className="text-blue-600 underline underline-offset-2">Bạn không tìm thấy số sê-ri của thiết bị? Hãy xem hướng dẫn</Link>
                    </div>

                </div>
                <div>
                </div>
            </div>
            {
                isOpenSearchModel &&
                <div className="flex flex-col gap-5 py-5">
                    <div className="flex justify-center items-center gap-5">
                        <div className="bg-black h-[1px] w-full"></div>
                        <h3 className="text-lg font-semibold text-nowrap">Không tìm thấy Số Serial. Vui lòng chọn kiểu máy (Model) để được hỗ trợ.</h3>
                        <div className="bg-black h-[1px] w-full"></div>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex flex-col items-center gap-2 p-5">
                            <div className="flex flex-col justify-between items-center gap-5 w-auto h-[10rem]">
                                <img src={real_tv} className="w-[10rem] h-auto" />
                                <span className="font-semibold">TV & Màn hình</span>
                            </div>
                            <IoCaretDownSharp />
                        </div>
                        <div className="flex flex-col items-center gap-2 p-5 opacity-50">
                            <div className="flex flex-col justify-between items-center gap-5 w-auto h-[10rem]">
                                <img src={phu_kien_tv} className="w-[8rem] h-auto" />
                                <span className="font-semibold">Phụ kiện TV</span>
                            </div>
                            {/* <IoCaretDownSharp /> */}
                        </div>
                        <div className="flex flex-col items-center gap-2 p-5 opacity-50">
                            <div className="flex flex-col justify-between items-center gap-5 w-auto h-[10rem]">
                                <img src={plus} className="w-[5rem] h-auto" />
                                <span className="font-semibold">Sản phẩm khác</span>
                            </div>
                            {/* <IoCaretDownSharp /> */}
                        </div>
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold border-b-2 border-gray-400 mb-2">Các Hãng Sản Phẩm</span>
                                <div className="border border-t-2 border-l-2 h-[24rem] overflow-y-scroll">
                                    <div onClick={() => setSelectedBrand("")} key={"default-selected-brand"} className="uppercase border-b px-4 py-2">
                                        <span className={selectedBrand === "" ? "text-blue-600 font-semibold" : ""}>Tất Cả</span>
                                    </div>
                                    {brands && brands.length > 0 &&
                                        brands.map((item, index) => {
                                            return (
                                                <div key={item._id} onClick={() => setSelectedBrand(item._id)} className="uppercase border-b px-4 py-2">
                                                    <span className={selectedBrand === item._id ? "text-blue-600 font-semibold" : ""}>{item.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="my-auto">
                                <FaAnglesRight size={32} />
                            </div>
                            <div className="flex flex-col gap-4 justify-between">
                                <div className="flex items-center border border-black px-4 py-2 gap-2" style={{ width: "fit-content" }}>
                                    <input value={searchModel}
                                        onChange={(event) => {
                                            const input = event.target.value
                                            const toValidInput = input.replace(/[^a-zA-Z0-9 ]/g, '').toLocaleUpperCase();
                                            setSearchModel(toValidInput);
                                        }}
                                        type="text" placeholder="Nhập kiểu máy (Model) ..." className="focus:outline-none" />
                                    <IoSearchOutline size={24} />
                                </div>
                                {
                                    searchModel.trim().length > 2 &&
                                    <div className="border border-t-2 border-l-2 h-[22rem] overflow-y-scroll">
                                        {products && products.length > 0 &&
                                            products
                                                .filter((item) =>
                                                    (selectedBrand === "" || item?.brand?._id === selectedBrand) &&
                                                    (item.modelNumber && item.modelNumber.includes(searchModel))
                                                )
                                                .map((item, index) => {
                                                    return (
                                                        <div key={item._id} onClick={() => setSearchResult({
                                                            product: item,
                                                            serial: searchSerial,
                                                            warranty: null
                                                        })} className="uppercase border-b px-4 py-2">
                                                            <span className={selectedBrand === item._id ? "text-blue-600 font-semibold" : ""}>{item?.modelNumber && "(" + item?.modelNumber + ")"} {item?.name}</span>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            }
            {searchResult &&
                <div>
                    <div className="text-lg font-semibold">Sản phẩm tìm thấy</div>
                    <div className="flex items-center border-y-[1px] border-gray-400 p-2 gap-10 text-xs md:text-lg">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold"></label>
                            <img className="w-[7rem] h-auto" src={product_image_placeholder} alt="product_placeholder" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Tên sản phẩm</label>
                            <span className="uppercase">{searchResult?.product?.name}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Kiểu máy (Model)</label>
                            <span>{searchResult?.product?.modelNumber}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Số Serial</label>
                            <span>{searchResult?.serial}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Bảo Hành</label>
                            {
                                searchResult.warranty ?
                                    <>
                                        {new Date() > new Date(searchResult.warranty.end_date) ?
                                            <span className="text-red-400 font-semibold border-2 border-red-400 rounded-md text-center">Hết Hạn</span>
                                            :
                                            <span className="text-green-400 font-semibold border-2 border-green-400 rounded-md text-center">Còn Hạn</span>}
                                    </>
                                    :
                                    <span>

                                    </span>
                            }
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label className="font-semibold">Tình trạng thiết bị</label>
                            <textarea value={issue} onChange={(event) => setIssue(event.target.value)} type="text" className="border focus:border-black px-2 py-1 text-[1rem] w-[24rem] focus:outline-none" placeholder="Mô tả sơ qua tình trạng thiết bị..." />
                        </div>
                    </div>
                    <div className="py-2 mt-2">
                        <div className="text-lg font-semibold mb-3">Thông tin khách hàng</div>
                        <div className="flex">
                            <div className="w-3/4 grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-900">Họ và tên</label>
                                    <input value={customerInfo.name} onChange={(event) => setCustomerInfo({ ...customerInfo, name: event.target.value })} type="text" id="customerName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tên khách hàng..." required />
                                </div>
                                <div>
                                    <label htmlFor="customerPhoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
                                    <input value={customerInfo.phone} onChange={(event) => setCustomerInfo({ ...customerInfo, phone: event.target.value })} type="text" id="customerPhoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Số điện thoại" required />
                                </div>
                                <div>
                                    <label htmlFor="customerEmail" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input value={customerInfo.email} onChange={(event) => setCustomerInfo({ ...customerInfo, email: event.target.value })} type="email" id="customerEmail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email..." />
                                </div>
                                <div>
                                    <label htmlFor="customerAddress" className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ</label>
                                    <input value={customerInfo.address} onChange={(event) => setCustomerInfo({ ...customerInfo, address: event.target.value })} type="text" id="customerAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Địa chỉ..." />
                                </div>
                            </div>
                            <div className="w-1/4 items-center my-auto flex flex-col gap-10">
                                <button onClick={() => handleAutoFillCustomerInfo()} type="button" className={userInfo?._id ? "font-semibold bg-blue-500 text-white text-base px-6 py-2 rounded-md  hover:bg-blue-600 text-nowrap" : "font-semibold bg-gray-400 text-black text-base px-6 py-2 rounded-md text-nowrap"}>Lấy theo tài khoản</button>
                                <button onClick={() => handleCreateRequest()} type="button" className="font-semibold text-lg px-6 py-2 rounded-full border-2 border-black hover:bg-gray-200 text-nowrap">Gửi yêu cầu</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Snackbar open={openMessage} autoHideDuration={3000} onClose={handleCloseMessage}>
                <Alert
                    onClose={handleCloseMessage}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default RegisterRepair