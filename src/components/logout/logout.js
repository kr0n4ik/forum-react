import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../services/provider";

const Logout = () => {
    const navigate = useNavigate()
    const { setAuth } = useContext(UserContext)
    useEffect(() => {
        setAuth(null)
        navigate('/')
    }, [navigate, setAuth]) 
}

export default Logout