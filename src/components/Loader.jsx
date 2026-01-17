import React, { useEffect, useState } from 'react';

function Loader({ isLoading, setIsLoading }) {


  if (!isLoading) return null;

  return (
<div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold tracking-widest mb-6">
        CineWorld
      </h1>

      <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-white animate-[loading_1.2s_infinite]" />
      </div>

    </div>
  );
}

export default Loader;