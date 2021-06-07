import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [listUsers, setListUsers] = useState([]);

    return (
        <AppContext.Provider value={{
            userState: { user, setUser },
            listUsersState: { listUsers, setListUsers }
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useUser() {
    const { userState } = useContext(AppContext);
    return userState;
}

export function useListUsers() {
    const { listUsersState } = useContext(AppContext);
    return listUsersState;
}