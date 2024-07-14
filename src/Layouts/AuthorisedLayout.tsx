import React from 'react';
import Navbar from '../components/Navbar';
import Sidemenubar from '../components/Sidemenubar';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
    <>
    <Navbar />
    <div className="flex content">
      <div className="sidenav">
        <Sidemenubar />
      </div>
      <div className="grow outletcard">
        <div className="page p-4">
          <Outlet />
        </div>
      </div>
    </div>
  </>
  
  );
};

export default AuthenticatedLayout;

