import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RestService from "../../services/rest";
import { UserContext } from "../../services/provider";

const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [name, setName] = useState("")
    const { setAuth } = useContext(UserContext)
    const onSendRegister = async (event) => {
        event.preventDefault()
        const info = RestService.onRegister(name, email, password)
        if (info) {
            setAuth(info)
            navigate('/')
        } else {
            setError('Ошибка регистрации')
        }
    }

    return (
        <div className="w-460">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="box">
                <div className="p-2">
                    <h3>регистрация</h3>
                    <hr />
                    <label className="form-label">Ваш ник</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ваш ник" value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <label className="form-label">Ваша почта</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ваша почта" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <label className="form-label">Пароль</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Пароль" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <label className="form-label">Повторите пароль</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Повторите пароль" value={repassword} onChange={event => setRePassword(event.target.value)} />
                    </div>
                    <div className="text-center mb-3">
                        <button onClick={onSendRegister} type="button" className="btn btn-secondary btn-lg">Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register