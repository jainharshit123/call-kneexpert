// src/App.tsx

import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate

// Import your pages and components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // Make sure to import the new Login page
import LeadDetail from "./components/LeadDetail";

// You can keep these, but the logic for when to fetch data
// should ideally move inside the Dashboard component itself.
import { useLeadStore } from "./store/leadStore"; 
import { CustomToaster } from "./components/ui/Toast";

function App() {
  // This useEffect should ideally be inside the Dashboard component
  // so it runs only when the dashboard is mounted.
  const fetchLeads = useLeadStore((state) => state.fetchLeads);
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    // The main container div is removed from here because the Login page
    // needs a full-screen background, while the dashboard has a different layout.
    // Layouts are now applied within the routes.
    <>
      <Routes>
        {/* Route 1: The root path now redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Route 2: The login page */}
        <Route path="/login" element={<Login />} />

        {/* Route 3: The dashboard page with its specific layout */}
        <Route
          path="/dashboard"
          element={
            <div className="bg-slate-50 font-sans max-w-md mx-auto shadow-2xl min-h-screen">
              <Dashboard />
            </div>
          }
        />
        
        {/* Route 4: The lead detail page with the same layout as the dashboard */}
        <Route
          path="/lead/:id"
          element={
            <div className="bg-slate-50 font-sans max-w-md mx-auto shadow-2xl min-h-screen">
              <LeadDetail />
            </div>
          }
        />
      </Routes>
      <CustomToaster />
    </>
  );
}

export default App;