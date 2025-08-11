import React from 'react';
import { useLeadStore } from '../store/leadStore';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import ActionBar from '../components/ActionBar';
import LeadsList from '../components/LeadsList';
import Filters from '../components/Filters';

const Dashboard = () => {
  // Select state and actions from the store
  const { isLoading, searchTerm, setSearchTerm, getFilteredLeads } = useLeadStore();
  const filteredLeads = getFilteredLeads();

  return (
    <div>
      <Header title="KneeXpert Leads" />
      <TabBar />
      <ActionBar />
      <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <LeadsList leads={filteredLeads} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;