// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate(); // Ensure this is within Router context
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     console.log("sdsabsdhbhjdsbh")
//     const query = new URLSearchParams(window.location.search);
//     const code = query.get('code');

//     const validateUser = async () => {
//       try {
//         const response = await axios.get(`/validate?code=${code}`);
//         if (response.status === 200) {
//           setUser(response.data);
//           // Redirect to the form or set a flag to show the form
//           navigate('/eventform'); // Example redirection after successful login
//         } else {
//           console.error('Authentication failed');
//         }
//       } catch (error) {
//         console.error('Error during validation:', error);
//       }
//     };

//     if (code) {
//       validateUser();
//     }
//   }, [navigate]);

//   if (user) {
//     return <div>Loading...</div>;
//   }
//   else{
//     const clientId = '97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com';
//     const redirectUri = 'http://localhost:4010/validate';
  
//     const handleLogin = () => {
//       const scope = 'https://www.googleapis.com/auth/calendar';
//       const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&include_granted_scopes=true`;


//      //access_type=offline&include_granted_scopes=true
  
//       // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;


//       // https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&client_id=97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com&redirect_uri=http://localhost:4010/validate
  
//       window.location.href ='/login';
//     };
  
//      return (
//       <div className="App">
//         <h1>Google OAuth 2.0 with React</h1>
//         <button onClick={handleLogin}>Login with Google</button>
//       </div>
//     );
//   }

 
  
// };

// export default Login;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const code = query.get('code');

//     const validateUser = async () => {
//       try {
//         const response = await axios.get(`/validate?code=${code}`);
//         if (response.status === 200) {
//           setUser(response.data);
//           navigate('/eventform'); // Redirect after successful login
//         } else {
//           console.error('Authentication failed');
//         }
//       } catch (error) {
//         console.error('Error during validation:', error);
//       }
//     };

//     if (code) {
//       validateUser();
//     }
//   }, [navigate]);

//   const clientId = '97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com';
//   const redirectUri = 'http://localhost:4010/validate';

//   const handleLogin = () => {
//     const scope = 'https://www.googleapis.com/auth/calendar';
//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&include_granted_scopes=true`;

//     window.location.href = authUrl;
//   };

//   if (user === null) {
//     return (
//       <div className="App">
//         <h1>Google OAuth 2.0 with React</h1>
//         <button onClick={handleLogin}>Login with Google</button>
//       </div>
//     );
//   }

//   return <div>Loading...</div>;
// };

// export default Login;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // useEffect(() => {
  //   console.log("edshbd")
  //   const query = new URLSearchParams(window.location.search);
  //   const code = query.get('code');

  //   const validateUser = async () => {
  //     try {
  //       const response = await axios.get(`/validate?code=${code}`);
  //       if (response.status === 200) {
  //         setUser(response.data);
  //         navigate('/events'); // Redirect after successful login
  //       } else {
  //         console.error('Authentication failed');
  //       }
  //     } catch (error) {
  //       console.error('Error during validation:', error);
  //     } finally {
  //       setLoading(false); // Set loading to false after validation
  //     }
  //   };

  //   if (code) {
  //     validateUser();
  //   } else {
  //     setLoading(false); // Set loading to false if no code is found
  //   }
  // }, [navigate]);

  const clientId = '97792527730-215jrhv476a23vdnagr4jm2om30h9ibl.apps.googleusercontent.com';
  const redirectUri = 'http://localhost:4010/validate';

  const handleLogin = () => {
    const scope = 'https://www.googleapis.com/auth/calendar';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&include_granted_scopes=true`;

    window.location.href = authUrl;
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Display loading indicator while validating
  // }

  return (
    <div className='root flex flex-col justify-center items-center'>
      <div className="flex flex-row logincard" onClick={handleLogin}>
            <div className="loginimg">
              <img
                src="../google.jpg"
                alt=""
                width="25px"
                height="25px"
              />
            </div>
            <div className="logintext ml-2">Sign in with Google</div>
          </div>
      {/* <button onClick={handleLogin}>Login with Google</button> */}
    </div>
  );
};

export default Login;

