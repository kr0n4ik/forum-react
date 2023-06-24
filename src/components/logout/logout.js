import { useEffect } from "react"
import useAuth from "../../hooks/use.auth"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    const {setAuth} = useAuth()
    useEffect(() => {
        setAuth(null)
        navigate('/')
    },[navigate, setAuth]) 
}

export default Logout