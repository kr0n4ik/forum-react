import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestService from "../../services/rest";

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSendLogin = async (event) => {
        event.preventDefault()
        if (await RestService.onLogin(email, password)) {
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
                    <h3>Sign In</h3>
                    <hr />
                    <label className="form-label">Display Name or Email Address</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Display Name or Email Address" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <label className="form-label">Password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" />
                        <label className="form-check-label">
                            Remember me
                        </label>
                        <p>Not recommended on shared computers</p>
                    </div>
                    <div className="text-center mb-3">
                        <button onClick={onSendLogin} type="button" className="btn btn-secondary btn-lg">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login