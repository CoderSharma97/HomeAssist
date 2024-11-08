import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-800"></div>
    </div>
  );
};

export default LoadingSpinner;
