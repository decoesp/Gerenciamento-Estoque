import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChangeHistory {
  id: number;
  timestamp: string;
  changes: string;
}

interface ChangeHistoryModalProps {
  itemId: number;
  
}

const ChangeHistoryModal: React.FC<ChangeHistoryModalProps> = ({ itemId }) => {
  const [changeHistory, setChangeHistory] = useState<ChangeHistory[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [lastChange, setLastChange] = useState<ChangeHistory | null>(null);

  const fetchChangeHistory = async (itemId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/items/${itemId}/history`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setChangeHistory(response.data);
        setLastChange(response.data[0]);
      } else {
        setChangeHistory([]);
        setLastChange(null);
      }
    } catch (error) {
      console.error('Erro ao buscar histórico de alterações:', error);
    }
  };

  useEffect(() => {
    fetchChangeHistory(itemId);
  }, [itemId]);

  const handleCloseModal = () => {
    setModalOpen(false);
    console.log('Modal fechado');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    console.log('Modal aberto');
  };

  return (
    <>
      <div className="flex mt-8  justify-between">
        {lastChange && (
          <>
          <li className="flex flex-col" >
          <p><span className="font-semibold">Timestamp:</span> {lastChange.timestamp}</p>
            <p><span className="font-semibold">Alterações:</span> {lastChange.changes}</p>
          </li>
          </>
        )}
        <a onClick={handleOpenModal} className="ml-2 underline text-blue-600 cursor-pointer">Ver histórico de alterações</a>
      </div>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="relative bg-white w-96 rounded-lg p-6">
            <button className="absolute top-2 right-2" onClick={handleCloseModal}>&times;</button>
            <h2 className="text-lg font-bold mb-4">Histórico de Alterações do Item</h2>
            <ul>
              {changeHistory.map((change, index) => (
                <li className="flex flex-col" key={index}>
                  <p><span className="font-semibold">Timestamp:</span> {change.timestamp}</p>
                  <p><span className="font-semibold">Alterações:</span> {change.changes}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeHistoryModal;
