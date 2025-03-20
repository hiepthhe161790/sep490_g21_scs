const GeneralInfo = ({ formData, handleChange }) => {
  return (
    <div>
      <h3 className="font-semibold">Thông tin chung</h3>
      <div className="grid grid-cols-2 gap-4">
        <select name="generalInfo.repairLocation" value={formData.repairLocation} onChange={handleChange}>
          <option value="">Chọn nơi sửa</option>
          <option value="Trung tâm">Trung tâm</option>
          <option value="Tại nhà">Tại nhà</option>
        </select>
        
        <input
          type="date"
          name="generalInfo.estimatedCompletionDate"
          value={formData.estimatedCompletionDate || ''}
          onChange={handleChange}
        />
        <input
          name="generalInfo.accessoriesIncluded"
          placeholder="Phụ kiện"
          value={formData.accessoriesIncluded}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;