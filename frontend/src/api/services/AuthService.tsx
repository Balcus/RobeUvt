import { AxiosError } from "axios";
import type { ApiResponse } from "../models/ApiResponse";
import type { LoginResponse } from "../models/User/LoginResponse";
import { BaseApiClient } from "../base/BaseApiClient";
import type { LoginModel } from "../models/User/LoginModel";
import type { AuthUserModel } from "../models/User/AuthUserModel";

export const authService = {
  login: async (
    userCode: string,
    mail: string
  ): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await BaseApiClient.post<LoginResponse>("/auth/login", {
        userCode,
        mail,
      } as LoginModel);
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
      await BaseApiClient.post("/auth/logout");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Logout failed" };
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<AuthUserModel>> => {
    try {
      const response = await BaseApiClient.get<AuthUserModel>("/auth/me");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  },
};
