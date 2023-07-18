import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestService from "../../services/rest";
import { UserContext } from "../../services/provider";


const Login = () => {
    const { setAuth } = useContext(UserContext)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSendLogin = async (event) => {
        event.preventDefault()
        const info = await RestService.onLogin(email, password)
        if (info) {
            setAuth(info)
            navigate('/')
        } else {
            setError('Неверный пароль')
        }
    }
    return (
        <div className="w-460">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="box">
                <div className="p-2">
                    <h3>Вход</h3>
                    <hr />
                    <label className="form-label">Ваш ник или почта</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ваш ник или почта" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <label className="form-label">Пароль</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Пароль" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className="text-center mb-3">
                        <button onClick={onSendLogin} type="button" className="btn btn-secondary btn-lg">Войти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login