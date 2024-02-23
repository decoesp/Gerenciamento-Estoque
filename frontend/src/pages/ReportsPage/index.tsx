import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const ReportsPage: React.FC = () => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stock/stock-report');
        setStockData(transformData(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  // Função para transformar os dados recebidos em um formato compatível com o gráfico
  const transformData = (data: any) => {
    return [
      { item: 'Total Products', stock: parseInt(data.total_products) },
      { item: 'Total Stock', stock: parseInt(data.total_stock) },
      { item: 'Available Stock', stock: parseInt(data.available_stock) },
      { item: 'Unavailable Stock', stock: parseInt(data.unavailable_stock) }
    ];
  };

  return (
    <div className="container mx-auto bg-[#F9F9FF] p-8">
      <h1 className="text-2xl font-bold mt-8 mb-4">Relatório de Estoque</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={stockData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
