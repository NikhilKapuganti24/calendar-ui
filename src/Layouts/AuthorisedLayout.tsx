import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
    <>
    
      <div className="d-flex content">
        <div className="flex-grow-1 w-full outletcard">
          <div className="page p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;

