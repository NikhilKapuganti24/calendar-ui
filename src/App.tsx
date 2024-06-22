

// // import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';



// // function App() {
// //   const onSuccess = (credentialResponse: any) => {
// //     // Handle successful login
// //     console.log('Logged in with Google:', credentialResponse);

// //     // Use the access token to make requests to the Google Calendar API
// //     // const accessToken = credentialResponse.access_token;
// //     // fetch('https://www.googleapis.com/calendar/v3/calendarList', {
// //     //   headers: {
// //     //     Authorization: `Bearer ${accessToken}`,
// //     //   },
// //     // })
// //     //   .then((response) => response.json())
// //     //   .then((data) => {
// //     //     console.log('Calendar List:', data);
// //     //     // Access calendar data here
// //     //   })
// //     //   .catch((error) => console.error(error));
// //   };

// //   const onFailure = (error: any) => {
// //     console.error('Login failed:', error);
// //   };

// //   const gsiButtonConfig: any = {
// //     onSuccess: onSuccess,
// //     onFailure: onFailure,
// //     scope: "https://www.googleapis.com/auth/calendar.readonly", // Request read-only access
// //     clientId: '97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com',
// //   };

// //   // return <GoogleOAuthProvider {...gsiButtonConfig} />;
// //  return (
// //   <GoogleOAuthProvider clientId='97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com'>
// //   <GoogleLogin
// //     onSuccess={(credentialResponse :any) => {
// //       console.log(credentialResponse);
// //     }}
// //     onError={() => {
// //       console.log('Login Failed');
// //     }}
// //   />
// //   </GoogleOAuthProvider>

// //  )
// // }

// // export default App;



// // import React from 'react';
// // import { GoogleLogin } from '@react-oauth/google';

// // function App() {
// //     const responseMessage = (response: any) => {
// //         console.log(response);
// //     };
// //     const errorMessage = () => {
// //         console.log("Aaa");
// //     };
// //     return (
// //         <div>
// //             <h2>React Google Login</h2>
// //             <br />
// //             <br />
// //             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
// //         </div>
// //     )
// // }
// // export default App;
// // import React, { useState, useEffect } from 'react';
// // import EventForm from './EventForm';
// // import Login from './Login';


// // function App() {
// //     const [ user, setUser ] :any= useState([]);
// //     const [ profile, setProfile ] :any= useState([]);


// //     // log out function to log the user out of google and set the profile array to null
// //     const logOut = () => {
     
// //         setProfile(null);
// //     };
   

// //     return (
// //         <div>
       
// // <Login></Login>
// //     <EventForm></EventForm>
// //             </div>
// //     );
// // }
// // export default App;

// import React, { useState, useEffect } from 'react';
// import EventForm from './EventForm';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Login from './Login';
// import axios from 'axios';


// function App() {
//   const [user, setUser] = useState(null); // Initialize user as null

//   // Function to log out the user
//   const logOut = () => {
//     setUser(null);
//   };

//   // Function to check if the user is logged in
//   const checkUserLoggedIn = async () => {
//     try {
//       const response = await axios.get('http://4010/validate'); // Endpoint to check user authentication
//       if (response.status === 200) {
//         setUser(response.data); // Set user data if authenticated
//       }
//     } catch (error) {
//       console.error('Error checking authentication status', error);
//     }
//   };

//   useEffect(() => {
//     checkUserLoggedIn(); // Check user authentication status on component mount
//   }, []);

//   if (user === null) {
//     // Render login if user is not authenticated
//     return <Login  />;
//   }

//   return (
//     <div>
//      return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/eventform" element={<EventForm />} />
//         {/* Define other routes as needed */}
//       </Routes>
//     </Router>
//   );
//     </div>
//   );
// }

// export default App;

// App.js or index.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import EventForm from './EventForm';
import Events from './Events'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/eventform" element={<EventForm />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/event/:eventId/edit"element={<EventForm />}  />
        <Route path="/"element={<Login />}  />
        <Route path="/token"element={<Events/>}  />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;



