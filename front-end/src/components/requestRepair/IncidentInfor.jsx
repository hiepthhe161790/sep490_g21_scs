import React, { useState } from "react";

// const IncidentInfor = ({ formData, handleFileChange }) => {
const IncidentInfor = ({ formData, handleChange }) => {
    return (
        <div>
            <h3 className="font-semibold">Thông tin sự cố</h3>
            <input name = "incidentInfor.issue" placeholder="Mô tả sự cố" value={formData.issue} onChange={handleChange} />
            {/* <div className="grid grid-cols-2 gap-4">
                <input type="file" value={formData.video} name="incidentInfor.video" accept="video/*" onChange={handleFileChange} />
                <input type="file" value={formData.images} name="incidentInfor.images" accept="image/*" onChange={handleFileChange} />
            </div> */}
        </div>
    );
};
export default IncidentInfor