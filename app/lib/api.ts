import {refreshToken as refreshAuthToken} from "@/app/services/authService";

const API_BASE_URL = "http://localhost:8080/api/v1";

// This promise will be used to ensure only one refresh request is active at a time.
let refreshTokenPromise: Promise<string | null> | null = null;

const isTokenExpired = (token: string): boolean => {
    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return true;
        const decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(decodedJson);
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

const getValidToken = async (): Promise<string> => {
    let token = localStorage.getItem("accessToken");

    if (token && !isTokenExpired(token)) {
        return token;
    }

    // If a refresh is already in progress, wait for it to complete.
    if (refreshTokenPromise) {
        const newToken = await refreshTokenPromise;
        if (!newToken) throw new Error("Session expired. Please login again.");
        return newToken;
    }

    // Start a new refresh process.
    refreshTokenPromise = refreshAuthToken();
    const newToken = await refreshTokenPromise;

    // Reset the promise once the refresh is complete.
    refreshTokenPromise = null;

    if (!newToken) {
        throw new Error("Session expired. Please login again.");
    }

    return newToken;
};

const apiFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
    const token = await getValidToken();

    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {...options, headers});

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({message: "An unknown API error occurred"}));
        throw new Error(errorData.message || `API request to ${path} failed with status ${response.status}`);
    }

    return response;
};

export default apiFetch;
