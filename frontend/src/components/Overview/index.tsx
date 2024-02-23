import React from 'react';

interface OverviewProps {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  totalStock: number;
  lastUpdated: string;
}

const Overview: React.FC<OverviewProps> = ({
  totalProducts,
  availableProducts,
  unavailableProducts,
  totalStock,
  lastUpdated,
}) => {
  return (
    <div className="overview" style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.1px', textAlign: 'start', width: '150px', height: '76px', top: '113px', left: '32px', gap: '8px' }}>
      <h2 className="px-4 text-xl font-bold mb-4" style={{ fontFamily: 'Roboto', fontSize: '22px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em', textAlign: 'start', width: '150px', height: '28px', top: '113px', left: '32px' }}>Overview</h2>
      <p className="mb-2 px-4" style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.1px', textAlign: 'start', width: '76px', height: '20px', top: '32px', left: '32px' }}>{lastUpdated}</p>
      <ul className="px-4 list-none p-0">
        <li className="mb-1" style={{ width: '150px', height: '28px', fontFamily: 'Roboto', fontSize: '22px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em', textAlign: 'start', marginTop: '100px' }}>Produtos totais</li>
        <li className="mb-1" style={{  fontFamily: 'Roboto', fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '0em', textAlign: 'start' }}>{totalProducts}</li>
        <li className="mb-1" style={{ width: '150px', height: '28px', fontFamily: 'Roboto', fontSize: '22px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em', textAlign: 'start', marginTop: '100px' }}>Disponíveis</li>
        <li className="mb-1" style={{  fontFamily: 'Roboto', fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '0em', textAlign: 'start' }}>{availableProducts}</li>
        <li className="mb-1" style={{ width: '150px', height: '28px', fontFamily: 'Roboto', fontSize: '22px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em', textAlign: 'start', marginTop: '100px' }}>Indisponíveis</li>
        <li className="mb-1" style={{  fontFamily: 'Roboto', fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '0em', textAlign: 'start' }}>{unavailableProducts}</li>
        <li className="mb-1" style={{ width: '150px', height: '28px', fontFamily: 'Roboto', fontSize: '22px', fontWeight: 400, lineHeight: '28px', letterSpacing: '0em', textAlign: 'start', marginTop: '100px' }}>Total em estoque</li>
        <li className="mb-1" style={{  fontFamily: 'Roboto', fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '0em', textAlign: 'start'}}>{totalStock}</li>
      </ul>
    </div>
  );
};

export default Overview;
