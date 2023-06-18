import fs from 'fs';
import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class Database {
    #conn = null

    async open(filename) {
        const dir = path.dirname(filename)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        filename = path.resolve(filename)
        // Open SQLite3 database file
        await open({
            filename: filename,
            driver: sqlite3.Database
        }).then(async (conn) => {
            this.#conn = conn
        }).catch(error => {
            throw error
        });
    }

    async addUser(name, email, password) {
        const result = await this.#conn.run('INSERT INTO users (nick, email, password) VALUES (:nick, :email, :password)', {
            ':nick': name,
            ':email': email,
            ':password': password
        })
        return result.lastID
    }

    async getUser(val) {
        val = val.replace(/[^\w\s\._@]/gi, '');
        return await this.#conn.get('SELECT * FROM users WHERE email=:val OR nick=:val', {
            ':val': val
        })
    }


    async getUserByEmail(email) {
        const row = await this.#conn.get('SELECT * FROM users WHERE email=:email', {
            ':email': email
        })
        if (!row) {
            return null
        }
        return row
    }

    async addPost(uid, tid, title, html) {
        await this.#conn.run('INSERT INTO posts (uid, tid, html) VALUES (:uid, :tid, :html)', {
            ':uid': uid,
            ':tid': tid,
            ':html': html,
        })
    }

    async getPosts(tid) {
        const rows = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", {
            ':tid': tid
        })
        const result = []
        for (const row of rows) {
            const user = await this.#conn.get("SELECT * FROM users WHERE id=:uid", {
                ':uid': row.uid
            })
            result.push({
                'html': row.html,
                'time': row.time,
                'nick': user.nick,
                'avatar': user.avatar ? user.avatar : 'spiderman'
            })
        }
        return result
    }

    async addTopic(uid, cid, title, html) {
        const result = await this.#conn.run('INSERT INTO topics (gid, title, view) VALUES (:gid, :title, :view)', {
            ':gid': cid,
            ':title': title,
            ':view': 0
        })
        return await this.#conn.run('INSERT INTO posts (uid, tid, html, time) VALUES (:uid, :tid, :html, :time)', {
            ':uid': uid,
            ':tid': result.lastID,
            ':html': html,
            ':time': Date.now()
        })
    }

    async getTopics(gid) {
        const topics = await this.#conn.all("SELECT * FROM topics WHERE gid=:gid", {
            ':gid': gid
        })
        let time = 0
        const result = []
        for (const topic of topics) {
            const row = {
                id: topic.id,
                title: topic.title,
                count: 0,
                last: {}
            }
            const posts = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", { ':tid': topic.id })
            if (posts.length > 0 && posts[0].time > time) {
                row.count = posts.length
                const post = posts[0]
                const user = await this.#conn.get("SELECT * FROM users WHERE id=:uid", {
                    ':uid': post.uid
                })
                row.last = {
                    uid: post.uid,
                    time: post.time,
                    avatar: user.avatar,
                    nick: user.nick,
                    title: topic.title
                }
                time = post.time
                result.push(row)
            }
        }
        /*if (!topics) {
            return []
        }
        for (const topic of topics) {
            const posts = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", {':tid': topic.id })
            result.push({
                id: topic.id,
                title: topic.title,
                count : posts.length
            })
        }*/
        return result
    }

    async getCategory() {
        const category = await this.#conn.all("SELECT * FROM category", {})
        if (!category) {
            return []
        }
        let time = 0
        const result = []
        for (const cat of category) {
            const row = {
                id: cat.id,
                title: cat.title,
                description: cat.description,
                icon: cat.icon,
                count: 0,
                last: {}
            }
            const topics = await this.#conn.all("SELECT * FROM topics WHERE gid=:gid", { ':gid': cat.id })
            for (const topic of topics) {
                const posts = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", { ':tid': topic.id })
                row.count += posts.length
                if (posts.length > 0 && posts[0].time > time) {
                    const post = posts[0]
                    const user = await this.#conn.get("SELECT * FROM users WHERE id=:uid", {
                        ':uid': post.uid
                    })
                    row.last = {
                        uid: post.uid,
                        time: post.time,
                        avatar: user.avatar,
                        nick: user.nick,
                        title: topic.title
                    }
                    time = post.time
                }
            }
            result.push(row)
        }

        return result
    }

    getLastPost(cid) {

    }
}

export default Database