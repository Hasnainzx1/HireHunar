import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center bg-white shadow-2xl rounded-3xl p-10 border border-blue-200">
        <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight mb-4">
          Hire<span className="text-blue-500">Hunar</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
          Empowering skilled individuals across Pakistan to find the right opportunities.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="px-8 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-lg rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
        </button>
        <div className="mt-6 text-sm text-gray-400">
          Made with 💙 in Pakistan
        </div>
      </div>
    </div>
  );
};

export default StartPage;
