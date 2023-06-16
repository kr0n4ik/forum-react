import express from "express"
import cors from 'cors';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Database  from "./database.js";

const key = '1a2b-3c4d-5e6f-7g8h'

const db = new Database()
const app = express()

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

app.listen(4000)