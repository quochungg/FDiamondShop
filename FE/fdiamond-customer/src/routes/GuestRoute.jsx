import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";


const GuestRoute = () => {
    const location = useLocation();
    const { token } = useAuth();

    if (token) {
        return <Navigate to='/' />
    }
    return <Outlet />

};

export default GuestRoute;
