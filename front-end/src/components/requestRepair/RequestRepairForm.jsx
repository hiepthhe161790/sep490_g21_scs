import React, { useState } from "react";
import StepProgress from "./StepProgress";
import CustomerInfo from "./CustomerInfo";
import GeneralInfo from "./GeneralInfo";
import ProductInfo from "./ProductInfo";
import StaffInfo from "./StaffInfo";
import IncidentInfor from "./Incidentinfor";
import RepairRequestService from "../../services/api/RepairRequestService";
import OtherInfo from "./OtherInfo";
import { toast } from 'react-toastify';
const RequestRepairForm = ({ request }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    assignedTechnicianId: "",
    incidentInfor: {
      issue: "",
    },
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      groupCustomerId: "",
    },
    otherInfo: {
      note: "",
    },
    generalInfo: {
      repairLocation: "",
      estimatedCompletionDate: "",
      accessoriesIncluded: [],
    },
    repairStatus: "PENDING",
    products: [],
    repairRecords: [],
    pay: {
      serviceFee: 0,
      totalAmount: 1000,
      payInWords: "một nghìn đồng",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const handleProductsChange = (newProducts) => {
    setFormData((prev) => ({
      ...prev,
      products: newProducts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RepairRequestService.createRepairRequest(formData);
      console.log(response);
      toast.success('Tạo phiếu bảo hành thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tạo phiếu bảo hành: ' + error.message);
    }
  };
console.log("formDataassignedTechnicianId", formData.assignedTechnicianId);
console.log("formDataascustomerId", formData.customerId);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Tạo Phiếu Bảo Hành</h2>
      <StepProgress statusStep={request?.status || "Tạo mới"} />
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <CustomerInfo formData={formData.customerInfo} handleChange={handleChange} />
        <GeneralInfo formData={formData.generalInfo} handleChange={handleChange} />
        <StaffInfo formData={formData} handleChange={handleChange} />
        <IncidentInfor formData={formData.incidentInfor} handleChange={handleChange} />
        <OtherInfo formData={formData.otherInfo} handleChange={handleChange} />
        <ProductInfo formData={formData.products} handleChange={handleChange} handleProductsChange={handleProductsChange} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Gửi Yêu Cầu
        </button>
      </form>
    </div>
  );
};

export default RequestRepairForm;
