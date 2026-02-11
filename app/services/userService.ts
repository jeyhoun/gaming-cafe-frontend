import { UserResponseDto } from "@/app/dto/user-response.dto";
import { ApiResult } from "@/app/dto/api-result.dto";
import { refreshToken } from "./authService";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const getCurrentUser = async (): Promise<ApiResult<UserResponseDto>> => {
    let token = localStorage.getItem("accessToken");
    
    if (!token) {
        throw new Error("No access token found");
    }

    let response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (response.status === 401 || response.status === 403) {
        // Token might be expired, try to refresh
        const newToken = await refreshToken();
        if (newToken) {
            // Retry with new token
            response = await fetch(`${API_BASE_URL}/users/me`, {
                headers: {
                    "Authorization": `Bearer ${newToken}`,
                    "Content-Type": "application/json"
                }
            });
        } else {
             throw new Error("Session expired. Please login again.");
        }
    }

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    return response.json();
};
