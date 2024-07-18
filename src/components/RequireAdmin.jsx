import { Navigate, Outlet } from "react-router-dom";

// Component imports
import { Spinner } from 'components';

// Hook imports
import useAuth from "../hooks/useAuth";

const RequireAdmin = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <><Spinner/></>;
    }

    return auth.role === 'ADMIN' ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireAdmin;
