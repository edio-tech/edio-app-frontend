import { Navigate, Outlet } from "react-router-dom";

// Component imports
import { Spinner } from 'components';


import useAuth from "../hooks/useAuth";

const RequireAuthentication = () =>  {
   const { auth, loading } = useAuth();
   const redirectTo = '/login';
    
   if (loading) {
      return <><Spinner/></>;
   }
    
   return auth?.id ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default RequireAuthentication;
