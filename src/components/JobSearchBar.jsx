import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';

const JobSearchBar = ({ searchTerm, setSearchTerm, selectedCity, setSelectedCity }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
        {/* Search Bar */}
        <div className="flex items-center flex-1 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 text-blue-600">
            <FiSearch className="text-xl" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, name or salary..."
            className="w-full px-2 py-3 text-base focus:outline-none placeholder-gray-400 font-medium"
          />
        </div>

        {/* City Filter */}
        <div className="flex items-center w-full md:w-64 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 text-blue-600">
            <FaFilter className="text-lg" />
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-2 py-3 text-base focus:outline-none font-medium text-gray-700 bg-transparent"
          >
            <option value="">All</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
