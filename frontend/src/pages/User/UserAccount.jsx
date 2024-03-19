import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaWallet, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../../Styles/UserAccount.css';

const UserAccount = ({children}) => {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="user-account-container">
      <div className="navbar">
        <div className="navbar-header">
          <h3>User Account</h3>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/userAccount"
              activeClassName="active"
              onClick={() => handleNavLinkClick('Dashboard')}
            >
              <FaHome className="nav-icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userAccount/bookings"
              activeClassName="active"
              onClick={() => handleNavLinkClick('Bookings')}
            >
              <FaCalendarAlt className="nav-icon" />
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userAccount/wallet"
              activeClassName="active"
              onClick={() => handleNavLinkClick('Wallet')}
            >
              <FaWallet className="nav-icon" />
              Wallet
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userAccount/account-details"
              activeClassName="active"
              onClick={() => handleNavLinkClick('Account Details')}
            >
              <FaUser className="nav-icon" />
              Account Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userAccount/logout"
              activeClassName="active"
              onClick={() => handleNavLinkClick('Logout')}
            >
              <FaSignOutAlt className="nav-icon" />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default UserAccount;
