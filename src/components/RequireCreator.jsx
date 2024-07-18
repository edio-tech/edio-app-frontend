import { Navigate, Outlet } from "react-router-dom";

// Component imports
import { Spinner } from 'components';

import useAuth from "../hooks/useAuth";

const RequireAdmin = () => {
   const { auth, loading } = useAuth();

   if(loading) {
      return <><Spinner/></>;
   }

   return auth.role === 'CREATOR' ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireAdmin;