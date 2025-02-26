import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, fetchUser } from "../services/api";


const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: async (username: string, password: string) => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetchUser();
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkUser();
    }, []);


    const login = async (username: string, password: string) => {
        try {
            const response = await apiLogin(username, password); // Ensure API is being called
            if (response.access_token) {
                setUser(response.user); // Set user
                setIsAuthenticated(true);
            } else {
                throw new Error("Invalid credentials");
            }
            console.log(localStorage.getItem("token")); // Should return null
            console.log(isAuthenticated); // Should be false
            console.log(user); // Should be null
        } catch (error) {
            console.error("Login failed", error);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = () => {
        apiLogout(); // Call API logout if needed
        localStorage.removeItem("token"); // Remove token
        setUser(null);
        setIsAuthenticated(false);
        console.log(localStorage.getItem("token")); // Should return null
        console.log(isAuthenticated); // Should be false
        console.log(user); // Should be null
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
