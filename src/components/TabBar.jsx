import React, { useState } from "react";

// Data for the tabs, separated by category
const tabData = {
  general: [
    {
      label: "Total Leads",
      count: 942,
      key: "totalLeads",
      category: "general",
    },
    { label: "Open", count: 13, key: "open", category: "general" },
    {
      label: "Not Answered",
      count: 81,
      key: "openNotAnswered",
      category: "general",
    },
    { label: "Call Back", count: 156, key: "callBack", category: "general" },
  ],
  opd: [
    {
      label: "OPD Interested",
      count: 35,
      key: "opdInterested",
      category: "opd",
    },
    { label: "OPD Booked", count: 1, key: "opdBooked", category: "opd" },

    { label: "OPD Visited", count: 3, key: "opdVisited", category: "opd" },
  ],
  vc: [
    { label: "Plan VC", count: 4, key: "planVC", category: "vc" },
    { label: "VC Done", count: 3, key: "vcDone", category: "vc" },
  ],
  treatment: [
    {
      label: "Ideal 4 SVF",
      count: 30,
      key: "ideal4SVF",
      category: "treatment",
    },
    { label: "Ideal 4 PRP", count: 1, key: "ideal4PRP", category: "treatment" },
    { label: "PRP Done", count: 0, key: "prpDone", category: "treatment" },

    {
      label: "Ideal 4 THR",
      count: 99,
      key: "ideal4THR",
      category: "treatment",
    },
    { label: "SVF Booked", count: 1, key: "svfBooked", category: "treatment" },
  ],
};

// Style variants for different tab categories
const tabStyles = {
  general: {
    base: "bg-slate-100 border-slate-200 text-slate-600",
    active: "bg-blue-100 border-blue-500 text-blue-800 ring-1 ring-blue-500",
  },
  opd: {
    base: "bg-green-50 border-green-200 text-green-700",
    active:
      "bg-green-100 border-green-500 text-green-800 ring-1 ring-green-500",
  },
  vc: {
    base: "bg-purple-50 border-purple-200 text-purple-700",
    active:
      "bg-purple-100 border-purple-500 text-purple-800 ring-1 ring-purple-500",
  },
  treatment: {
    base: "bg-yellow-50 border-yellow-200 text-yellow-700",
    active:
      "bg-yellow-100 border-yellow-500 text-yellow-800 ring-1 ring-yellow-500",
  },
};

const TabItem = ({ label, count, isActive, onClick, styles }) => (
  <button
    onClick={onClick}
    className={`flex-1 text-center cursor-pointer p-0.5 rounded-md transition-all duration-200 border ${
      isActive ? styles.active : styles.base
    }`}
  >
    <div className="font-bold text-xs">{count}</div>
    <div className="text-xs font-medium uppercase tracking-wider leading-tight">
      {label}
    </div>
  </button>
);

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("totalLeads");

  // Combine OPD and VC tabs for the second row
  const middleRowTabs = [...tabData.opd, ...tabData.vc];

  return (
    <div className="bg-white p-2 border-b border-slate-200 space-y-1.5">
      {/* First Row */}
      <div className="flex gap-1.5">
        {tabData.general.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            styles={tabStyles.general}
          />
        ))}
      </div>

      {/* Second Row (Combined) */}
      <div className="flex gap-1.5">
        {middleRowTabs.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            styles={tabStyles[tab.category]}
          />
        ))}
      </div>

      {/* Third Row */}
      <div className="flex gap-1.5">
        {tabData.treatment.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            styles={tabStyles.treatment}
          />
        ))}
      </div>
    </div>
  );
};

export default TabBar;
