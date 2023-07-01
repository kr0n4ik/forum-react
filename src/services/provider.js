import { createContext, useState } from "react";

export const UserContext = createContext({
    dispatch: () => null
})

export const UserProvider = ({ children }) => {
    const getInfo = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return user
    }

    const [auth, _setAuth] = useState(getInfo())

    const setAuth = userInfo => {
        sessionStorage.setItem('user', JSON.stringify(userInfo))
        _setAuth(userInfo)
    }

    return (
        <UserContext.Provider value={{auth: auth, setAuth:setAuth}}>
            {children}
        </UserContext.Provider>
    )
}