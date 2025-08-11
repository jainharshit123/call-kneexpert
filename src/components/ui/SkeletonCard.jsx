import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            <div className="h-5 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 rounded mt-4 w-full"></div>
    <div className="h-4 bg-gray-200 rounded mt-2 w-5/6"></div>
    <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
    </div>
  </div>
);

export default SkeletonCard;