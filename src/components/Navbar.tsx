import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [showBlock, setShowBlock] = useState(false);

  const location = useLocation();
  const showLogoutCard = location.pathname !== '/';
  console.log("sssss",showLogoutCard)

  const showLogout = () => {
    setShowBlock(!showBlock);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'
  }
  return (
    <div className="navbarStyling">
      <div className='d-flex flex-start d-flex justify-content-center align-items-center'>
        <h3 className='fw-500'>Shropshire UKSPF Learner Record</h3>
        <hr className="custom-hr" />
        <h6 className='ms-1 mt-1 text-white fw-400'>Developed by School of Coding & AI</h6>
      </div>
      {showLogoutCard && (
      <div className="position-relative" style={{ cursor: 'pointer' }}>
        <div className="mr-2 w-10 h-10 rounded-full bg-gray-500 text-xl cursor-pointer" onClick={showLogout}>
          <img src='./defaultavatar.svg' alt="User" className="rounded-full" style={{ width: '30px', height: '50px' }} />
        </div>
        {showBlock && (
          <div className="position-absolute  py-1 bg-white rounded-lg shadow-2xl  bordercolor card" style={{ marginTop: '12px', right: 0 }}>
            <div className="flex block px-4 py-2 text-gray-800 cursor-pointer wrapper" onClick={handleLogout}>
              <div className="logout-text">Logout</div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Navbar;



