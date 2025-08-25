import React from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-bold text-blue-800 tracking-wide flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-2">
                <FiBriefcase className="text-blue-600 text-2xl" />
              </div>
              Hire<span className="text-blue-600">Hunar</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm">
              Empowering skilled individuals across Pakistan to find the right opportunities and grow their careers.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</Link>
              </li>
              <li>
                <Link to="/job-post" className="text-gray-600 hover:text-blue-600 transition-colors">Post a Job</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="mailto:contact@hirehunar.pk" className="hover:text-blue-600 transition-colors">contact@hirehunar.pk</a>
              </li>
              <li>
                <p>Contact Me</p>
              </li>
              <li className="pt-2">
                <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-gray-500 hover:text-blue-600 transition-colors text-2xl" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-gray-500 hover:text-blue-600 transition-colors text-2xl" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-gray-500 hover:text-blue-600 transition-colors text-2xl" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-500 hover:text-blue-600 transition-colors text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HireHunar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;