import { useContext, useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { commonApi } from "../services/api";



const AuthenticationCheck = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          setIsLoading(false);
          navigate('/')
          return
          
        }

        const response = await commonApi.get('/verifyToken');
        console.log("sss",response)
        if(response.status==200){
          console.log("success")
        }else{
          navigate('/')
        }
        setIsLoading(false);
      } catch (error: any) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setIsLoading(false);
        setError(error);
      }
    };

    checkToken();
    return () => { };
  }, [location.pathname]);

  if (error) {
    console.error('Authentication error:', error);
    window.location.href='/';
  }
  return <>{children}</>;
};

export default AuthenticationCheck;





