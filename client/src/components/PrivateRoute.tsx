import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    element: React.ReactElement;
    adminOnly?: boolean;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, adminOnly = false, ...rest }) => {
    const { isLoggedIn, userRole } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (adminOnly && userRole !== 'admin') {
        return <Navigate to="/home" />;
    }

    return <Route {...rest} element={element} />;
};

export default PrivateRoute;
