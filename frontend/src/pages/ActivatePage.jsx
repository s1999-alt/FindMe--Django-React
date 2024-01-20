import React from 'react';
import { FaUserCheck } from 'react-icons/fa';
import '../Styles/ActivatePage.scss'

const ActivatePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="activate-container">
      <div className="activate-content">
        <h1 className="activate-heading">Activate Account <FaUserCheck /></h1>
        <button className="button-submit" onClick={handleSubmit}>
          Activate
        </button>
      </div>
    </div>
  );
};

export default ActivatePage;