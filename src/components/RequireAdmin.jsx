import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAdmin = () => {
    const { auth, loading } = useAuth();

    if(loading) {
        return <></>;
    }

    return auth.role === 'ADMIN' ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireAdmin;
