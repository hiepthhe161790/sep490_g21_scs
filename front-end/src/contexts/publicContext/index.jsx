import React, { createContext, useState, useEffect } from 'react';
import CategoryService from '../../services/api/CategoryService';
import BrandService from '../../services/api/BrandService';
import ProductService from '../../services/api/ProductService';

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await CategoryService.getAllCategories();
      setCategories(result);
    };

    const fetchBrands = async () => {
      const result = await BrandService.getAllBrands();
      setBrands(result);
    };

    const fetchProducts = async () => {
      const result = await ProductService.getAllProducts();
      setProducts(result);
    };

    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [refresh]);

  const refreshData  = () => {
    setRefresh(prev => !prev);
  };

  return (
    <PublicContext.Provider value={{ categories, brands, products, refreshData }}>
      {children}
    </PublicContext.Provider>
  );
};