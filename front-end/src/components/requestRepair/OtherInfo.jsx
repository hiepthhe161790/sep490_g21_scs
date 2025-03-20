
const OtherInfo  = ({ formData, handleChange }) => {
    return (
        <div>
            <h3 className="font-semibold">Thông tin khác</h3>
            <input name = "otherInfo.note" placeholder="Ghi chú" value={formData.note} onChange={handleChange} />
              {/* <div className="grid grid-cols-2 gap-4">
                            <input type="file" value={formData.invoiceImages} name="otherInfo.invoiceImages" accept="image/*" onChange={handleFileChange} />
                        </div> */}
        </div>
    );
};
export default OtherInfo