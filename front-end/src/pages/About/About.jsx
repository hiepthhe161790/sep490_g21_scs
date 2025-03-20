import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { locationMapping } from "../../constants";
const getLocationName = (path) => {
  return locationMapping[path] || path;
};
const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    const path = location?.state?.data;
    setPrevLocation(getLocationName(path));
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Giới thiệu" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Hà Chính</span>{" "}
          is one of the world's leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic Worldwide cool
          looking style.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
          Tiếp tục mua sắm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
