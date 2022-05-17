import React, { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [userGlobalState, setUserGlobalState] = useState(null);

    const login = (user) => {
        setUserGlobalState(user);
    }

    const logout = () => {
        setUserGlobalState(null);
    }

    return (
        <UserContext.Provider value={{ userGlobalState, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
export { UserContext }