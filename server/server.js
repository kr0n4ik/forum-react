import express from "express"
import cors from 'cors';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Database  from "./database.js";

const key = '1a2b-3c4d-5e6f-7g8h'

const db = new Database()
const app = express()
const react = express()

react.use(express.static('../build/'));

app.use(cors())
app.use(express.json())

await db.open('forum.sqlite3')

app.post("/login", async function(req, res){
    const {email, password} = req.body
    const hash = await bcrypt.hash(password, 15)
    const user = await db.getUser(email)
    if (!user) {
        return res.status(401).json('USER_NOT_FOUND')
    }
    //if (user.password != hash) {
       // return res.status(401).json('INVALIDE_PASSWORD')
   // }
    return res.status(200).json({
        id: user.id,
        token: jwt.sign({
            id: user.id 
        }, key)
    })
})

app.post("/register", async function(req, res){
    const {name, email, password} = req.body
    let user = await db.getUser(email)
    if (user) {
        return res.status(401).json('USER_FOUND')
    }
    user = await db.getUser(name)
    if (user) {
        return res.status(401).json('USER_FOUND')
    }
    const hash = await bcrypt.hash(password, 15)
    const id = await db.addUser(name, email, hash)
    if (!id) {
        return res.status(500).json('ERROR_BD')
    }
    return res.status(200).json({
        id: id,
        token: jwt.sign({
            id: id 
        }, key)
    })
})

app.get("/category", async function(req, res) {
    const data = await db.getCategory()
    if (data) {
        return res.status(200).json(data)
    }
    return res.status(404)
})

app.get("/topics/:cid", async function(req, res) {
    const cid = parseInt(req.params['cid'])
    const data = await db.getTopics(cid)
    if (data) {
        return res.status(200).json(data)
    }
    return res.status(404)
})

app.post("/topic/add", async function(req, res) {
    const {cid, title, html, token} = req.body
    if (!token) {
        return res.status(401)
    }
    let decode = null
    try {
		decode = jwt.verify(token, key)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
    db.addTopic(decode.id, cid, title, html)
    return res.status(200).json({'ok':true})
})

app.get("/posts/:tid", async function(req, res) {
    const tid = parseInt(req.params['tid'])
    const data = await db.getPosts(tid)
    if (data) {
        return res.status(200).json(data)
    }
    return res.status(404)
})

app.get("/profile/:uid", async function(req, res) {
    const uid = parseInt(req.params['uid'])
    const data = await db.getProfile(uid)
    if (data) {
        return res.status(200).json(data)
    }
    return res.status(404)
})

app.post("/post/add", async function(req, res) {
    const {tid, html, token} = req.body
    if (!token) {
        return res.status(401)
    }
    let decode = null
    try {
		decode = jwt.verify(token, key)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
    await db.addPost(decode.id, tid, html)
    return res.status(200).json({'ok':true})
})

app.listen(4000)
react.listen(80)