const API_BASE_URL = "http://localhost:8080/api/v1";

export const refreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            // If refresh fails, we might need to log out the user
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return null;
        }

        const data = await response.json();
        if (data.data?.accessToken) {
            localStorage.setItem("accessToken", data.data.accessToken);
            return data.data.accessToken;
        }
        return null;
    } catch (error) {
        console.error("Failed to refresh token", error);
        return null;
    }
};
