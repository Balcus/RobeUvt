import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUserModel } from "../models/User/AuthUserModel";
import { authService } from "../services/AuthService";
import type { ApiResponse } from "../models/ApiResponse";
import type { LoginResponse } from "../models/User/LoginResponse";

interface AuthContextType {
  user: AuthUserModel | null;
  loading: boolean;
  login: (
    userCode: string,
    email: string
  ) => Promise<ApiResponse<LoginResponse>>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  role: string | null;
  hasRole: (requiredRole: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    const result = await authService.getCurrentUser();
    if (result.success && result.data) {
      setUser(result.data);
    }
    setLoading(false);
  };

  const login = async (
    userCode: string,
    email: string
  ): Promise<ApiResponse<LoginResponse>> => {
    const result = await authService.login(userCode, email);
    if (result.success) {
      await checkAuth();
    }
    return result;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const hasRole = (requiredRole: string | string[]): boolean => {
    if (!user?.role) return false;
    return Array.isArray(requiredRole)
      ? requiredRole.includes(user.role)
      : user.role === requiredRole;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    role: user?.role || null,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
