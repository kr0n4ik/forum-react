import axios from "axios";

const HOST = 'http://localhost:4000/';

const RestService = {
    get token() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user && user.token) ? user.token : null
    },
    onLogin(email, password) {
        return axios
            .post(HOST + 'login', {
                email,
                password,
            })
            .then((res) => {
                console.log(res)
                if (res.data.token) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    return true
                }
                return false
            })
            .catch(err => {
                console.log(err)
                return false
            })
    },
    onRegister(name, email, password) {
        return axios
            .post(HOST + 'register', {
                name,
                email,
                password,
            })
            .then((res) => {
                console.log(res)
                //if (res.data.token) {
                   // localStorage.setItem("token", JSON.stringify(res.data))
                    //return true
                //}
                return false
            })
            .catch(err => {
                console.log(err)
                return false
            })
    },
    onLogout() {
        localStorage.setItem("user", null)
    },
    getCategory(gid) {
        return axios
            .get(HOST + `category`,{})
            .then((response) => {
                return response.data
            })
            .catch(err => {
                return []
            })
    },
    getTopics(cid) {
        return axios
            .get(HOST + `topics/${cid}`, {})
            .then((response) => {
                return response.data
            })
            .catch(err => {
                return []
            })
    },
    addTopic(cid, title, html) {
        return axios
            .post(HOST + "topic/add", {
                title: title,
                html: html,
                cid: cid,
                token: this.token
            })
            .then(response => {
                return true
            })
            .catch(err => {
                return false
            })
    }
}

export default RestService