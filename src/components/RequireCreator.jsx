import { Navigate, Outlet } from "react-router-dom";

// Component imports
import { Spinner } from 'components';

import useAuth from "../hooks/useAuth";

const RequireCreator = () => {
   const { auth, loading } = useAuth();

   if(loading) {
      return <><Spinner/></>;
   }

   return auth.role === 'CREATOR' || auth.role === 'ADMIN' ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireCreator;