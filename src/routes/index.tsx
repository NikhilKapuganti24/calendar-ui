import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthenticationCheck from "./authenticationcheck";

import AuthenticatedLayout from '../Layouts/AuthorisedLayout';
import UnauthenticatedLayout from '../Layouts/UnAuthorizedLayout';
import EventForm from '../features/EventForm';
import Events from '../features/Events';
import Login from '../features/Login';

const Router = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  console.log("ssss",isLoggedIn)

  return (
    <Routes>
      {/* Unauthenticated Routes */}
      <Route element={<UnauthenticatedLayout />}>
        {<Route path="/" element={<Login />} />}
        { <Route path="*" element={<Navigate to="/" />} />} {/* Redirect to login if not authenticated */}
      </Route>
      
      {/* Authenticated Routes */}
      <Route element={<AuthenticatedLayout />}>

      
        
        { <Route path="/eventform" element={<AuthenticationCheck><EventForm /></AuthenticationCheck>} />}
        { <Route path="/events" element={<Events/>} />}
        { <Route path="/token"element={<Events/>}  />}
        { <Route path="/event/:eventId/edit" element={<AuthenticationCheck><EventForm /></AuthenticationCheck>} />}
        { <Route path="*" element={<Navigate to="/events" />} />} {/* Redirect to default authenticated route */}
      </Route>
    </Routes>
  );
};

export default Router;
