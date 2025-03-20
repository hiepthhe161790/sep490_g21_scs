import React, { useEffect, useState, useContext } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { SplOfferData } from "../../../constants";
import { useParams } from "react-router-dom";
import { PublicContext } from '../../../contexts/publicContext';
const SpecialOffers = () => {
  const { products } = useContext(PublicContext);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  useEffect(() => {
    setData(SplOfferData);
  }, [data]);

  const catData = products.filter((item) => item.category.name === "tivi");
  const visibleProducts = catData.slice(0, visibleCount);

  // Handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount(visibleCount + 9);
  };
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {visibleProducts.map((item) => (
          <Product
            key={item._id}
            _id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
            color={item.color}
            isDeleted={item.isDeleted}
            description={item.description}
            pdf={item.pdf}
            specs={item.specs}
            inStock={item.inStock}
            category={item.category.name}
            brand={item.brand.name}
            cost={item.cost}
          />
        ))}
      </div>
      {visibleCount < catData.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="bg-primeColor text-white px-6 py-2 rounded-lg">
            Hiển thị thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
