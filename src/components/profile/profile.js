import { useEffect, useState } from "react"
import RestService from "../../services/rest"
import { useParams } from "react-router-dom"
import Moment from 'react-moment'
import useAuth from "../../hooks/use.auth"

const Profile = () => {
    const { auth } = useAuth()
    const { uid } = useParams()
    const [data, setData] = useState('')
    useEffect(() => {
        RestService.getProfile(uid).then(result => {
            if (result) {
                setData(result)
            }
        })
    }, [uid])
    return (
        <div className="box">
            <div className="d-flex align-self-end p-2">
                {
                    (auth?.id == uid) ?
                        <div className="btn-group w-auto ms-auto" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary">Left</button>
                            <button type="button" className="btn btn-primary">Middle</button>
                            <button type="button" className="btn btn-primary">Right</button>
                        </div>
                    : null
                }
            </div>
            <div className="d-flex">
                <div className="w-184 text-center">
                    <div className="position-relative w-110 ml-auto mb-4">
                        <img src={`/assets/${data.avatar}.png`} className="wh-110" alt="Автвтвр" />
                    </div>
                </div>
                <div>
                    <div className="p-2 t-lg">{data.nick}</div>
                    <div className="d-flex">
                        <div className="p-2">
                            <p className="t-sm">постов</p>
                            <p className="t-md text-right">{data.posts}</p>
                        </div>
                        <div className="p-2">
                            <p className="t-sm">зарегистрирован</p>
                            <p className="t-md text-right">
                                <Moment unix fromNow>{data.joined}</Moment>
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="t-sm">посещение</p>
                            <p className="t-md text-right">
                                <Moment unix fromNow>{data.visited}</Moment>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile