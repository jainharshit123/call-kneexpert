import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadDetail from "./components/LeadDetail.tsx";
import { useLeadStore } from "./store/leadStore";
import { CustomToaster } from "./components/ui/Toast";

function App() {
  const fetchLeads = useLeadStore((state) => state.fetchLeads);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="bg-slate-50 font-sans max-w-md mx-auto shadow-2xl min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lead/:id" element={<LeadDetail />} />
      </Routes>
      <CustomToaster />
    </div>
  );
}

export default App;
