


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const clientId = process.env.REACT_APP_CLIENT_ID
  const redirectUri = process.env.REACT_APP_REDIRECT_URL

  const handleLogin = () => {
    const scope = process.env.REACT_APP_SCOPE
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&include_granted_scopes=true`;

    window.location.href = authUrl;
  };
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
    </div>
  );
};

export default Login;

