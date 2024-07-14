import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { commonApi } from "../services/api";

const AuthenticationCheck = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        debugger;
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          navigate('/');
          return;
        }

        const response = await commonApi.get('/verifyToken');

        if (response.status === 200) {
          setIsLoading(false);
        } else {
          throw new Error('Token verification failed');
        }
      } catch (err: any) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    checkToken();
  }, [location.pathname, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
};

export default AuthenticationCheck;
