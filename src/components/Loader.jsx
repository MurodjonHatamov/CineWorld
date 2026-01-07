import React, { useEffect, useState } from 'react';

function Loader({ isLoading, setIsLoading }) {


  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-50 flex items-center justify-center">
      
      {/* Asosiy loader container */}
      <div className="relative">
        
        {/* Spinning circles */}
        <div className="relative w-32 h-32">
          {/* Outer gray circle */}
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          
          {/* Blue spinning arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-400 rounded-full animate-spin-slow"></div>
          
          {/* Inner cyan spinning arc */}
          <div className="absolute inset-4 border-3 border-transparent border-b-cyan-400 border-l-cyan-300 rounded-full animate-spin-reverse"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>

   

      </div>

 
    </div>
  );
}

export default Loader;