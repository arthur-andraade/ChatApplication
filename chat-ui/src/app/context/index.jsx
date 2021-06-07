import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState("");

    return (
        <AppContext.Provider value={{
            userState: { user, setUser },
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useUser() {
    const { userState } = useContext(AppContext);
    return userState;
}