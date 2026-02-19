import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    userName: string | null;
    setUserName: (name: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
    const [userName, setUserNameState] = useState<string | null>(localStorage.getItem('amenity_user'));

    const setUserName = (name: string) => {
        localStorage.setItem('amenity_user', name);
        setUserNameState(name);
    };

    const logout = () => {
        localStorage.removeItem('amenity_user');
        setUserNameState(null);
    };

    return (
        <UserContext.Provider value={{ userName, setUserName, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser use within UserProvider");
    return context;
};