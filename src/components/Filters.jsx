import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useLeadStore } from "../store/leadStore";

const Filters = () => {
  const searchTerm = useLeadStore((state) => state.searchTerm);
  const setSearchTerm = useLeadStore((state) => state.setSearchTerm);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-3 border-b border-slate-200 flex items-center gap-3 sticky top-[72px] z-10">
        {/* Search Input */}
        <div className="relative flex-grow">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
        >
          <FiFilter />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Modal (Basic Implementation) */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Advanced Filters</h2>
            <p className="text-sm text-slate-600 mb-6">
              Advanced filtering options (e.g., by status, team, or priority)
              would be developed here.
            </p>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
