import React, { useEffect, useState } from 'react';

function Loader({ isLoading, setIsLoading }) {


  if (!isLoading) return null;

  return (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
  );
}

export default Loader;