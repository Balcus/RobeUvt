import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUserModel } from "../models/AuthUserModel";
import { authService } from "../services/AuthService";
import type { ApiResponse } from "../models/ApiResponse";
import type { LoginResponse } from "../models/LoginResponse";

interface AuthContextType {
    user: AuthUserModel | null;
    loading: boolean;
    login: (email: string) => Promise<ApiResponse<LoginResponse>>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
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
        email: string,
    ): Promise<ApiResponse<LoginResponse>> => {
        const result = await authService.login(email);
        if (result.success) {
            await checkAuth();
        }
        return result;
    };

    const logout = async (): Promise<void> => {
        await authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
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