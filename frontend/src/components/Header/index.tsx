import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Avatar } from "@mui/material";

const Header: React.FC = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string>(location.pathname); // Inicia com a página atual

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        background: '#5DF9EF',
        color: '#00504C'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  return (
    <>
      <header className="border-b border-gray-300 flex justify-center items-center py-8">
        <div className="flex justify-between items-center w-full px-4">
          {/* Logo */}
          <div>
            <img src="/ColourfulLogo.svg" alt="Logo" />
          </div>
          {/* Botões do Header */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex flex-col items-center space-x-2 px-44 ${
                currentPage === "/" ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handlePageChange("/")}
            >
              {/* SVG */}
              <StackedLineChartIcon
                className={`h-5 w-5 ${
                  currentPage === "/" ? "text-blue-500" : "text-gray-600"
                }`}
              />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              to="/add"
              className={`flex flex-col items-center space-x-2 px-44 ${
                currentPage === "/add" ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handlePageChange("/add")}
            >
              {/* SVG */}
              <AddHomeOutlinedIcon
                className={`h-5 w-5 ${
                  currentPage === "/add" ? "text-blue-500" : "text-gray-600"
                }`}
              />
              <span className="text-sm font-medium">Novo Item</span>
            </Link>
            <Link
              to="/reports"
              className={`flex flex-col items-center space-x-2 px-44 ${
                currentPage === "/reports" ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handlePageChange("/reports")}
            >
              {/* SVG */}
              <InsertChartOutlinedIcon
                className={`h-5 w-5 ${
                  currentPage === "/reports" ? "text-blue-500" : "text-gray-600"
                }`}
              />
              <span className="text-sm font-medium">Relatórios</span>
            </Link>
          </div>
          {/* User Settings */}
          <div className="flex items-center space-x-2">
          <Avatar 
              variant="rounded" 
              {...stringAvatar('Michael Scott')} />
            <span className="text-sm font-medium">Michael Scott</span>
            <ArrowDropDownOutlinedIcon />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
