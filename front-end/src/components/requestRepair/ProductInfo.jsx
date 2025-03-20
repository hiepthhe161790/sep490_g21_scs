import { useState } from "react";
import Serials from "./Serials";

const ProductInfo = ({ formData, handleProductsChange }) => {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [customProduct, setCustomProduct] = useState({
    productName: "",
    serialNumber: "",
    model: "",
    warrantyStart: "",
    warrantyDuration: "",
    warrantyStatus: "",
    requestType: "",
  });

  const handleCustomProductChange = (e) => {
    const { name, value } = e.target;
    setCustomProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomProduct = () => {
    handleProductsChange([...formData, customProduct]);
    setCustomProduct({
      productName: "",
      serialNumber: "",
      model: "",
      warrantyStart: "",
      warrantyDuration: "",
      warrantyStatus: "",
      requestType: "",
    });
  };

 
  const handleAddProductFromSerials = (newProducts) => {
    handleProductsChange([...formData, ...newProducts]);
  };

  
  const handleRemoveProductFromSerials = (index) => {
    handleProductsChange(formData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="font-semibold mt-4">Thông tin sản phẩm</h3>

      <div className="flex gap-4 mt-2 mb-4">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsStoreModalOpen(true)}
        >
          + Thêm sản phẩm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Serial</th>
              <th className="border border-gray-300 px-4 py-2">Model</th>
              <th className="border border-gray-300 px-4 py-2">Ngày kích hoạt BH</th>
              <th className="border border-gray-300 px-4 py-2">Thời gian BH</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái BH</th>
              <th className="border border-gray-300 px-4 py-2">Loại yêu cầu</th>
              <th className="border border-gray-300 px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((product, index) => (
              <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{product?.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{product?.serialNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{product?.productModelNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{product?.warrantyStartDate ? new Date(product?.warrantyStartDate).toLocaleDateString() : 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{product?.warrantyStatus ? 'Còn bảo hành' : 'Hết bảo hành'}</td>
                <td className="border border-gray-300 px-4 py-2">{product?.warrantyPeriod}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={product?.requestType || ""}
                    onChange={(e) => {
                      const updatedProducts = [...formData];
                      updatedProducts[index].requestType = e.target.value;
                      handleProductsChange(updatedProducts);
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                  >
                    <option value="">Chọn loại yêu cầu</option>
                    <option value="REPAIR">Sửa chữa</option>
                    <option value="WARRANTY">Bảo hành</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemoveProductFromSerials(index)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chọn sản phẩm */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <Serials onAddProducts={handleAddProductFromSerials} />
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsStoreModalOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
