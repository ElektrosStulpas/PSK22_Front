import React, { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState("");

    const login = (name) => {
        setUser(name);
    }

    const logout = () => {
        setUser("");
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
export { UserContext }