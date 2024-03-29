import React, { useEffect, useState } from 'react';
import EditItemForm from '../../components/EditItemForm';
import Overview from '../../components/Overview';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItemPage: React.FC = () => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {


    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stock/stock-report');
        setOverviewData(response.data);
        setLastUpdatedDate(formatDate(response.data.last_updated));


      } catch (error) {
        console.error('Erro ao carregar os dados do item:', error);
      }
    };

    fetchOverviewData();
  }, [id]); 

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
            lastUpdated={lastUpdatedDate}
          />
        )}
      </div>
      <div className="flex justify-center">
        <div className="container mx-auto px-24">
          <h1 className="py-16 mr-16 font-roboto text-2xl font-bold leading-10">Editar item</h1>
          {id && <EditItemForm itemId={parseInt(id)} />} 
        </div>
      </div>
    </div>
  );
};

export default EditItemPage;
