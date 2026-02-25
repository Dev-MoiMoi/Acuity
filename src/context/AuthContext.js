import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize with null to simulate logged out state
    // Or set to a mock user for quicker development/testing
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login logic
        if (email.includes('owner')) {
            setUser({
                id: 'owner-1',
                name: 'Maria Clara',
                email,
                role: 'owner',
                businessId: 'b1'
            });
        } else {
            setUser({
                id: 'res-1',
                name: 'Juan Dela Cruz',
                email,
                role: 'resident',
                address: 'Purok 1, Banay-Banay',
                location: { x: 45, y: 60 } // User's map coordinates for distance calc
            });
        }
        return true;
    };

    const register = (userData) => {
        // Mock registration
        setUser({
            id: `user-${Date.now()}`,
            ...userData
        });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isOwner: user?.role === 'owner',
        isResident: user?.role === 'resident',
        login,
        register,
        logout,
        updateProfile: (data) => setUser({ ...user, ...data })
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
