import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import UserService from '../../services/userService';

const StaffInfo = ({ formData, handleChange }) => {
  const { currentUser } = useAuth();
  const [staffs, setStaffs] = useState([]);
  const fetchStaffs = async () => {
    const data = await UserService.getAllUsers();
    setStaffs(data);
  };
  useEffect(() => {
    fetchStaffs();
    handleChange({ target: { name: "customerId", value: currentUser._id } });
  }, []);

  return (
    <div>
      <h3 className="font-semibold">Nhân viên</h3>
      <div className="grid grid-cols-2 gap-4">
      <select
          name="assignedTechnicianId"
          value={formData.assignedTechnicianId}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2"
        >
          <option value="">Chọn người phụ trách</option>
          {staffs?.map(staff => (
            <option key={staff?._id} value={staff?._id}>
              {staff?.lname}
            </option>
          ))}
        </select>
        <input
           type="text"
          name="customerId"
          placeholder="Người tạo"
          value={formData.customerId}
          readOnly 
        />
        <p>{currentUser?.lname}</p>
      </div>
    </div>
  );
};

export default StaffInfo;
