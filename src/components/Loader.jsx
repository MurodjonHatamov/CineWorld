import React from "react";

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        <p className="text-white/70 text-sm tracking-widest animate-pulse">
          LOADING
        </p>
      </div>
    </div>
  );
}

export default Loader;
