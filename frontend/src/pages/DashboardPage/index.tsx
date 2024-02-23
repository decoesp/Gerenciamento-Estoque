import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterAndSearch from '../../components/FilterAndSearch';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import Overview from '../../components/Overview';

const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>('');

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stock/stock-report');
        setOverviewData(response.data);
        setLastUpdatedDate(formatDate(response.data.last_updated));
      } catch (error) {
        console.error('Error loading Overview data:', error);
      }
    };

    fetchOverviewData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/items');
      setProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (category: string) => {
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-[#F9F9FF]">
      <div className="w-1/4 p-4 bg-[#005bbe] text-white"> 
        {overviewData && ( 
          <Overview
            totalProducts={overviewData.total_products}
            availableProducts={overviewData.available_stock}
            unavailableProducts={overviewData.unavailable_stock}
            totalStock={overviewData.total_stock}
            lastUpdated={lastUpdatedDate} />
        )}
      </div>
      <div className="w-3/4 p-4"> {/* Largura definida para 3/4 */}
        <div className="inline grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <FilterAndSearch categories={categories} onSearch={handleSearch} onFilter={handleFilter} />
          <ProductCard products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
