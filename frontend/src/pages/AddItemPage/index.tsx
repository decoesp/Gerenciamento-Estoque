import React, { useEffect, useState } from 'react';
import AddItemForm from '../../components/AddItemForm';
import Overview from '../../components/Overview';
import axios from 'axios';

const AddItemPage: React.FC = () => {
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
      <div className="flex justify-center">
  <div className="container mx-auto px-24">
    <h1 className="py-16 mr-16 font-roboto text-2xl font-bold leading-10">Cadastrar novo item</h1>
    <AddItemForm />
  </div>
</div>
</div>
  );
};

export default AddItemPage;
