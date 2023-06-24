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
        const time = Math.round(Date.now() / 1000)
        const result = await this.#conn.run('INSERT INTO users (nick, email, password, group_id, posts, reputation, rank, avatar, male, online, joined, visited) VALUES (:nick, :email, :password, :gid, :posts, :reputation, :rank, :avatar, :male, :online, :joined, :visited)', {
            ':nick': name,
            ':email': email,
            ':password': password,
            ':gid': 0,
            ':posts': 0,
            ':reputation': 0,
            ':rank': 0,
            ':avatar': 'default',
            ':male': 1,
            ':online': 1,
            ':joined': time,
            ':visited': time
        })
        return result.lastID
    }

    async getUser(val) {
        val = val.replace(/[^\w\s\._@]/gi, '');
        return await this.#conn.get('SELECT * FROM users WHERE email=:val OR nick=:val', {
            ':val': val
        })
    }

    async getProfile(id) {
        return await this.#conn.get('SELECT * FROM users WHERE id=:id', {
            ':id': id
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

    async addPost(uid, tid, html) {
        await this.#conn.run('UPDATE users SET posts = posts + 1 WHERE id=:id', {
            ':id': uid
        })
        const time = Math.round(Date.now() / 1000)
        await this.#conn.run('INSERT INTO posts (uid, tid, html, time) VALUES (:uid, :tid, :html, :time)', {
            ':uid': uid,
            ':tid': tid,
            ':html': html,
            ':time': time
        })
    }

    async getPosts(tid) {
        const rows = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", {
            ':tid': tid
        })
        if (rows.length > 0) {
            await this.#conn.run('UPDATE topics SET view = view + 1 WHERE id=:id', {
                ':id': tid
            })
        }
        const result = []
        for (const row of rows) {
            const user = await this.#conn.get("SELECT * FROM users WHERE id=:id", {
                ':id': row.uid
            })
            result.push({
                'id': row.id,
                'html': row.html,
                'time': row.time,
                'user': {
                    'uid': user.id,
                    'nick': user.nick,
                    'group': user.group_id,
                    'avatar': user.avatar,
                    'posts': user.posts,
                    'reputation': user.reputation
                }
            })
        }
        return result
    }

    async addTopic(uid, cid, title, html) {
        const result = await this.#conn.run('INSERT INTO topics (gid, title, view, uid) VALUES (:gid, :title, :view, :uid)', {
            ':gid': cid,
            ':title': title,
            ':view': 1,
            ':uid': uid
        })
        await this.addPost(uid, result.lastID, html)
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
                view: topic.view,
                count: 0,
                user: {},
                post: {}
            }
            const posts = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time DESC", { ':tid': topic.id })
            if (posts.length > 0 && posts[0].time > time) {
                row.count = posts.length
                const post = posts[0]
                const user = await this.#conn.get("SELECT * FROM users WHERE id=:uid", {
                    ':uid': post.uid
                })
                row.user = {
                    uid: user.id,
                    avatar: user.avatar,
                    nick: user.nick,
                    joined: user.joined
                }
                row.post = {
                    time: post.time
                }
                time = post.time
                result.push(row)
            }
        }
        return result
    }

    async getCategory() {
        const category = await this.#conn.all("SELECT * FROM category", {})
        if (!category) {
            return []
        }
        const result = []
        for (const cat of category) {
            const row = {
                id: cat.id,
                title: cat.title,
                description: cat.description,
                icon: cat.icon,
                count: 0,
                user: {},
                post:{}
            }
            let time = 0
            const topics = await this.#conn.all("SELECT * FROM topics WHERE gid=:gid", { ':gid': cat.id })
            for (const topic of topics) {
                const posts = await this.#conn.all("SELECT * FROM posts WHERE tid=:tid ORDER BY time", { ':tid': topic.id })
                row.count += posts.length
                if (posts.length > 0 && posts[0].time > time) {
                    const post = posts[0]
                    const user = await this.#conn.get("SELECT * FROM users WHERE id=:uid", {
                        ':uid': post.uid
                    })
                    row.user = {
                        uid: user.id,
                        avatar: user.avatar,
                        nick: user.nick
                    }
                    row.post = {
                        time: post.time,
                        title: topic.title,
                        tid: topic.id 
                    }
                    time = post.time
                }
            }
            result.push(row)
        }

        return result
    }
}

export default Database