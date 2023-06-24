import { useState } from "react"

const useAuth = () => {
    const getInfo = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return user
    }

    const [auth, _setAuth] = useState(getInfo())

    const setAuth = userInfo => {
        sessionStorage.setItem('user', JSON.stringify(userInfo))
        _setAuth(userInfo)
    }

    return {
        auth,
        setAuth
    }
}

export default useAuth