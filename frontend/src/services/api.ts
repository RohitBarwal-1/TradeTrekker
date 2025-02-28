import axios from "axios";

// Backend API URL
const API_URL = "http://127.0.0.1:8000/"; // Update with your backend URL

// Create Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to set authentication token
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
};

// Signup API
export const signup = async (username: string, fname: string, lname: string, email: string, contact: string, is_staff: boolean, is_active: boolean, password: string) => {
    console.log(username, fname, lname, email, contact, is_staff, is_active, password)
    return await api.post("auth/register",
        { username, fname, lname, email, contact, is_staff, is_active, password }
    );
};

// Login API
export const login = async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await api.post("auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
};


// Logout API
export const logout = () => {
    setAuthToken(null);
    console.log(localStorage.getItem("token")); // Should return null
};

// Fetch user profile (protected route)

export default api;
