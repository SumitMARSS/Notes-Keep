

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 opacity-20"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-6">Now rent a friend.</h1>
        <button 
          className="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Home;
