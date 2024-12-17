import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full"></div>
    </div>
  );
};

export default Loading;
