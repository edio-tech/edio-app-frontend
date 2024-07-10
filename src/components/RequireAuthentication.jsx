import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

const RequireAuthentication = () =>  {
   const { auth, loading } = useAuth();
   const redirectTo = '/login';
    
   if (loading) {
      return <></>;
   }
    
   return auth?.id ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default RequireAuthentication;
