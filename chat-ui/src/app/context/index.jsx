import React, { createContext, useState } from "react";

const initialValues = {
    user: {
        id: 0,
        name: ""
    }
}
const AppContext = createContext(initialValues);

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(initialValues.user);
    return (
        <AppContext.Provider value={{
            user: { user, setUser }
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;