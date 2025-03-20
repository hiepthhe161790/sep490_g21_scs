import React, { useState, useEffect } from 'react';
import GroupCustomerService from '../../services/api/GroupCustomerService';
const CustomerInfo = ({ formData, handleChange }) => {
  const [groupCustomers, setGroupCustomers] = useState([]);
  useEffect(() => {
    const fetchGroupCustomers = async () => {
        const data = await GroupCustomerService.getAllGroupCustomers();
        setGroupCustomers(data);
    };
    fetchGroupCustomers();
}, []);
// console.log("groupCustomers", groupCustomers);
    return (
      <div>
        <h3 className="font-semibold">Thông tin khách hàng</h3>
        <div className="grid grid-cols-2 gap-4">
        <input
        type="text"
        name="customerInfo.name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên khách hàng"
      />
      <input
        type="email"
        name="customerInfo.email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="customerInfo.phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Số điện thoại"
      />
         <select
          name="customerInfo.groupCustomerId"
          value={formData.groupCustomerId}
          onChange={handleChange}
        >
          <option value="">Chọn nhóm khách hàng</option>
          {groupCustomers.map((groupCustomer) => (
            <option key={groupCustomer._id} value={groupCustomer._id}>
              {groupCustomer.name}
            </option>
          ))}
         </select>
        </div>
      </div>
    );
  };
  
  export default CustomerInfo;
  