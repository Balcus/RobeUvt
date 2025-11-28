import axios from "axios";

export const defaultHeaders = {
    "Content-Type": "application/json",
};

export const ApiClient = axios.create({
    baseURL: "http://localhost:5287/",
    headers: defaultHeaders,
    withCredentials: true,
});

ApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            try {
                if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            } catch {
                
            }
        }
        return Promise.reject(error);
    }
);