import React from "react";

const IconButton = ({ icon: Icon, color, onClick, title = "" }) => {
  const colorClasses = {
    "blue-light": "bg-blue-100 text-blue-600 hover:bg-blue-200",
    "green-light": "bg-green-100 text-green-600 hover:bg-green-200",
    "grey-light": "bg-slate-100 text-slate-600 hover:bg-slate-200",
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
        colorClasses[color] || "bg-slate-100 text-slate-600"
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default IconButton;
