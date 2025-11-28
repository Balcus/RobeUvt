import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../api/context/AuthContext";


interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};