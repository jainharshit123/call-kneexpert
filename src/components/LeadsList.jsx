import React from 'react';
import LeadCard from './ui/LeadCard';
import SkeletonCard from './ui/SkeletonCard';

const LeadsList = ({ leads, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-3 space-y-3">
        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (leads.length === 0) {
      return <p className="text-center text-gray-500 p-8">No leads found.</p>
  }

  return (
    <div className="p-3 space-y-3">
      {leads.map(lead => (
        <LeadCard key={lead.name} lead={lead} />
      ))}
    </div>
  );
};

export default LeadsList;