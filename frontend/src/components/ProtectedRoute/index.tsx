import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../api/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | string[];
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const allowedRoles = (
      Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    ).map((r) => r.trim().toLowerCase());
    const userRole = (user?.role || "").trim().toLowerCase();
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};
