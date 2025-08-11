import React from "react";
import {
  FiAlertTriangle,
  FiClock,
  FiCheckSquare,
  FiMessageSquare,
} from "react-icons/fi";

const ActionButton = ({ text, icon, colorClass }) => (
  <button
    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold transition-transform hover:scale-105 ${colorClass}`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const ActionBar = () => {
  return (
    <div className="bg-slate-100 p-1.5">
      <div className="flex gap-1 overflow-x-auto pb-2 -mb-2">
        <ActionButton
          text="Urgent"
          icon={<FiAlertTriangle />}
          colorClass="bg-red-600"
        />
        <ActionButton
          text="Pending"
          icon={<FiClock />}
          colorClass="bg-orange-500"
        />
        <ActionButton
          text="Whatsapp"
          icon={<FiMessageSquare />}
          colorClass="bg-green-600"
        />

        <ActionButton
          text="WhatsForm"
          icon={<FiCheckSquare />}
          colorClass="bg-green-500"
        />
        {/* Add more buttons here if needed */}
      </div>
    </div>
  );
};

export default ActionBar;
