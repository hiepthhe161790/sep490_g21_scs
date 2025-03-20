import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NavTitle from "./NavTitle";
import { togglePrice } from "../../../../redux/orebiSlice";
import Slider from "@mui/material/Slider";

const Price = () => {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const dispatch = useDispatch();

  const handleChange = (event, newRange) => {
    setPriceRange(newRange);
    dispatch(togglePrice({ priceOne: newRange[0], priceTwo: newRange[1] }));
  };

  return (
    <div className="cursor-pointer p-4">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont mt-4">
        <Slider
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={3000}
          step={10}
        />
        <div className="flex justify-between text-sm text-[#767676] mt-2">
          <span>${priceRange[0].toFixed(2)}</span>
          <span>${priceRange[1].toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Price;
