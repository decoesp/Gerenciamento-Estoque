import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'; 

interface FilterAndSearchProps {
  categories: string[];
  onSearch: (searchTerm: string, category: string) => void;
  onFilter: (category: string) => void;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({ categories, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value, selectedCategory);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center"> 
        <span className="mr-16 font-roboto text-2xl font-bold leading-10 text-center">Em estoque</span>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-2 py-1 border border-gray-300 rounded-md pl-8"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
        </div>
      </div>
      <div>
      <span className="font-roboto text-sm font-medium leading-20 text-center">Filtrar por: </span>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-2 py-1 border border-gray-300 rounded-md mr-4"
        > 
          <option value="">Categoria</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <Link to="/add" className="bg-[#005BBE] text-white px-4 py-2 rounded-xl flex items-center">
        <AddIcon /> 
         Criar Novo Item
        </Link>
      </div>
    </div>
  );
};

export default FilterAndSearch;
