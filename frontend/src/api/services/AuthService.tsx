import { AxiosError } from "axios";
import type { ApiResponse } from "../models/ApiResponse";
import type { LoginResponse } from "../models/LoginResponse";
import { ApiClient } from "../base/BaseApiClient";
import type { LoginModel } from "../models/LoginModel";
import type { AuthUserModel } from "../models/AuthUserModel";

export const authService = {
    login: async (
        mail: string,
    ): Promise<ApiResponse<LoginResponse>> => {
        try {
            const response = await ApiClient.post<LoginResponse>(
                "/auth/login",
                { mail } as LoginModel
            );
            return { success: true, data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return {
                success: false,
                error: axiosError.response?.data?.message || "Login failed",
            };
        }
    },

    logout: async (): Promise<ApiResponse<void>> => {
        try {
            await ApiClient.post("/auth/logout");
            return { success: true };
        } catch (error) {
            return { success: false, error: "Logout failed" };
        }
    },

    getCurrentUser: async (): Promise<ApiResponse<AuthUserModel>> => {
        try {
            const response = await ApiClient.get<AuthUserModel>("/auth/me");
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false };
        }
    },
};