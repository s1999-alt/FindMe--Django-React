import React from 'react';
import { FaUser } from "react-icons/fa";

// Replace with the actual SVG paths for the Register and Login icons
const registerIcon = (
  <svg
    className="fill-current h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24" 
    viewBox="0 0 24 24"
  >
    <path d="M19 13H21V16H24V18H21V21H19V18H16V16H19V13M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M12 4A6 6 0 0 1 18 10H16A4 4 0 0 0 12 6A4 4 0 0 0 8 10H6A6 6 0 0 1 12 4M12 8A2 2 0 1 1 10 10A2 2 0 0 1 12 8Z" />
  </svg>
);

const loginIcon = (
  <svg
    className="fill-current h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
  </svg>
);

const accountIcon = (
  <svg
    className="fill-current h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12,2A5,5 0 0,1 17,7A5,5 0 0,1 12,12A5,5 0 0,1 7,7A5,5 0 0,1 12,2M12,14C15.31,14 20,15.79 20,18V20H4V18C4,15.79 8.69,14 12,14M12,4A3,3 0 0,1 15,7A3,3 0 0,1 12,10A3,3 0 0,1 9,7A3,3 0 0,1 12,4Z" />
  </svg>
);


const Navbar = () => {
  return (
    <nav className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full relative z-10">
      {/* Logo Container */}
      <div className="flex items-center">
        {/* Logo */}
        <a className="cursor-pointer">
          <h3 className="text-2xl font-medium text-blue-500">
            <img
              className="h-7 object-cover"
              src="/logo.jpg"
              alt="Store Logo"
            />
          </h3>
        </a>
      </div>

      {/* Links Section */}
      <div className="items-center hidden space-x-8 lg:flex">
        <a className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          Home
        </a>

        <a
          className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
        >
          Destinations
        </a>

        <a className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          Packages
        </a>

        <a className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          About Us
        </a>
      </div>

      {/* Icon Menu Section */}
      <div className="flex items-center space-x-5">
        {/* Register */}
        <a className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          {registerIcon}
          Register
        </a>

        {/* Login */}
        <a className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600">
          {loginIcon}
          Login
        </a>

        <a className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600">
          {accountIcon}
          Account
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
