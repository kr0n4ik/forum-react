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
                    <h3>Sign Up</h3>
                    <hr />
                    <label className="form-label">Display Name</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Display Name" value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <label className="form-label">Email Address</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Email Address" value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <label className="form-label">Password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <label className="form-label">Re password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={repassword} onChange={event => setRePassword(event.target.value)} />
                    </div>
                    <div className="text-center mb-3">
                        <button onClick={onSendRegister} type="button" className="btn btn-secondary btn-lg">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register