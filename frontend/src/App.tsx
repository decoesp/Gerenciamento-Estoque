// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage'; // Importe a página de edição
import ReportsPage from './pages/ReportsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app font-roboto">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/edit/:id" element={<EditItemPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
