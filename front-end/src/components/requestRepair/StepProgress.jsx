import React from "react";

const steps = ["Tạo mới", "Kiểm tra", "Xác nhận", "Đang sửa chữa", "Hoàn thành"];

const StepProgress = ({ statusStep }) => {
  const currentStep = steps.indexOf(statusStep) !== -1 ? steps.indexOf(statusStep) : 0;

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
              ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && <div className="w-10 h-1 bg-gray-300"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
