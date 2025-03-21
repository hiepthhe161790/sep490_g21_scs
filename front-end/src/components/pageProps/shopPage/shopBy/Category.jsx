import React, { useState, useEffect, useContext } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/orebiSlice";
import CategoryService from "../../../../services/api/CategoryService";
import { motion } from "framer-motion";
import { PublicContext } from "../../../../contexts/publicContext";
const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(true);
  const { categories } = useContext(PublicContext);
  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const dispatch = useDispatch();

  const handleToggleCategory = (categories) => {
    dispatch(toggleCategory(categories));
  };

  return (
    <div className="w-full">
      <div
        onClick={() => setShowSubCatOne(!showSubCatOne)}
        className="cursor-pointer"
      >
        <NavTitle title="Danh mục" icons={true} />
      </div>

      {showSubCatOne && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {categories.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedCategorys.some((b) => b._id === item._id)}
                  onChange={() => handleToggleCategory(item)}
                />
                {item.name}
                {item.icons && (
                  <span
                    onClick={() => setShowSubCatOne(!showSubCatOne)}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    <ImPlus />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Category;
