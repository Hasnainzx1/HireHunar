import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiBriefcase, FiHome, FiStar, FiMail, FiPlusCircle } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'flex items-center px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100 transition-all duration-300'
      : 'flex items-center px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200';

  const mobileNavLinkClasses = ({ isActive }) =>
    isActive
      ? 'flex items-center px-4 py-4 text-blue-700 font-semibold bg-blue-50 border-l-4 border-blue-700 transition-all duration-300'
      : 'flex items-center px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200';

  return (
    <>
      <nav className="bg-white shadow-md py-3 px-6 md:px-8 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-800 tracking-wide flex items-center"
        >
          <div className="bg-blue-100 p-2 rounded-lg mr-2">
            <FiBriefcase className="text-blue-600 text-xl md:text-2xl" />
          </div>
          Hire<span className="text-blue-600">Hunar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="space-x-2 text-sm font-medium hidden md:flex">
          <NavLink to="/" className={navLinkClasses}>
            <FiHome className="mr-2" />
            Home
          </NavLink>
          <NavLink to="/reviews" className={navLinkClasses}>
            <FiStar className="mr-2" />
            Reviews
          </NavLink>
          {/* <NavLink to="/contact" className={navLinkClasses}>
            <FiMail className="mr-2" />
            Contact
          </NavLink> */}
          <NavLink to="/applied-jobs" className={navLinkClasses}>
            <FiBriefcase className="mr-2" />
            Applied Jobs
          </NavLink>
          <NavLink to="/job-post" className={navLinkClasses}>
            <FiPlusCircle className="mr-2" />
            Post Job
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="flex flex-col py-4">
              <NavLink 
                to="/" 
                className={mobileNavLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiHome className="mr-3 ml-4" />
                Home
              </NavLink>
              <NavLink 
                to="/reviews" 
                className={mobileNavLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiStar className="mr-3 ml-4" />
                Reviews
              </NavLink>
              {/* <NavLink 
                to="/contact" 
                className={mobileNavLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                <FiMail className="mr-3 ml-4" />
                Contact
              </NavLink> */}
               <NavLink to="/applied-jobs" className={navLinkClasses}>
            <FiBriefcase className="mr-2" />
            Applied Jobs
          </NavLink>
              <NavLink 
                to="/job-post" 
                className={mobileNavLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                
                <FiPlusCircle className="mr-3 ml-4" />
                Post Job
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;