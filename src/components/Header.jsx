import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="text-2xl transition-transform hover:scale-110"
          >
            <IoArrowBack />
          </button>
        )}
        <h1 className="text-xl font-bold truncate">{title}</h1>
      </div>
      <div className="text-sm font-medium text-right shrink-0">
        <p>Dr. Rajesh Kumar</p>
      </div>
    </header>
  );
};

export default Header;
