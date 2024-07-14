// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import AuthenticationCheck from "./authenticationcheck";
// import AuthenticatedLayout from '../Layouts/AuthorisedLayout';
// import UnauthenticatedLayout from '../Layouts/UnAuthorizedLayout';
// import EventForm from '../features/EventForm';
// import Events from '../features/Events';
// import Login from '../features/Login';
// import Calendar from '../features/Calendar';

// const Router = () => {
//   const loggedIn=localStorage.getItem('token')
//   return (
//     <Routes>
//       {/* Unauthenticated Routes */}
//       <Route element={<UnauthenticatedLayout />}>
//      {  <Route path="/" element={<Login />} />}
//      {   <Route path="*" element={<Navigate to="/" />} /> }{/* Redirect to login if not authenticated */}
//       </Route>
      
//       {/* Authenticated Routes */}
//       <Route element={<AuthenticatedLayout />}>
//       {   <Route path="/eventform" element={<EventForm />} />}
//       {     <Route path="/events" element={<Events />} />}
//       {    <Route path="/token" element={<Events />} />}
//       {    <Route path="/calendar" element={<Calendar />} />}
//       {   <Route path="/event/:eventId/edit" element={<EventForm />} />}
//       {   <Route path="*" element={<Navigate to="/events" />} />} {/* Redirect to default authenticated route */}
//       </Route>
//     </Routes>
//   );
// };

// export default Router;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthenticatedLayout from '../Layouts/AuthorisedLayout';
import UnauthenticatedLayout from '../Layouts/UnAuthorizedLayout';
import EventForm from '../features/EventForm';
import Events from '../features/Events';
import Login from '../features/Login';
import Calendar from '../features/Calendar';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const Router = () => {
  const loggedIn = localStorage.getItem('token');
  return (
    <Routes>
      {/* Unauthenticated Routes */}
      <Route element={<UnauthenticatedLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login if not authenticated */}
      </Route>

      {/* Authenticated Routes */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/eventform" element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          // <ProtectedRoute>
            <Events />
          // </ProtectedRoute>
        } />
        <Route path="/token" element={
          // <ProtectedRoute>
            <Events />
          // </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/event/:eventId/edit" element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/token" />} /> {/* Redirect to default authenticated route */}
      </Route>
    </Routes>
  );
};

export default Router;
