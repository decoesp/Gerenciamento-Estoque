import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DataLoaderProps {
  url: string;
  children: React.ReactNode;
}

const DataLoader: React.FC<DataLoaderProps> = ({ url, children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement, { data });
        })
      )}
    </>
  );
};

export default DataLoader;
