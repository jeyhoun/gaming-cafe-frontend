import {UserResponseDto} from "@/app/dto/user-response.dto";
import {ApiResult} from "@/app/dto/api-result.dto";
import apiFetch from "@/app/lib/api";

export const getCurrentUser = async (): Promise<ApiResult<UserResponseDto>> => {
    const response = await apiFetch("/users/me");

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    return response.json();
};
