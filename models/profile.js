const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Profile {
    constructor(id, username, password){
        this.id       = id
        this.username = username
        this.password = password
    }

    static getProfile(cb){
        db.all(`SELECT P.id, P.username, P.password FROM Profile P`, (err, rows)=>{
            rows.map(add=>{
                let profile = new Profile(add.id, add.username, add.password)
                cb(profile)
            })
        })
    }

    static getAll(cb) {
        db.all(`SELECT P.id,P.username,P.password, C.name FROM Profiles P JOIN Contacts C ON P.ContactsId = C.id`, (err, rows) => {
            if (!err) {
                db.all(`SELECT id, name FROM Contacts`, (err, rowcontacts)=>{
                    if(!err){
                        cb(rows, rowcontacts)
                    }else{
                        console.log(err)
                    }
                })
                // cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertProfile(param, cb) {
        db.run(`INSERT INTO Profiles (username, password, ContactsId)
        VALUES ('${param.username}','${param.password}',${param.ContactsId})`, (err) => {
                if (!err) {
                    cb()
                } else {
                    cb(err)
                }
            })
    }

    static deleteProfile(param, cb) {
        db.run(`DELETE FROM Profiles WHERE id = ${param}`, (err) => {
            if (!err) {
                cb()
            } else {
                console.log(err)
            }
        })
    }

    static editProfile(param, cb) {
        db.all(`SELECT P.id, P.username, P.password, C.name FROM Profiles P JOIN Contacts C ON P.ContactsId = C.id WHERE P.id = ${param}`, (err, rows) => {
            if (err){
                console.log(err)
            } else {
                cb(rows)
            }
            // cb(rows)
        })
    }

    static updateProfile(body, param, cb) {
        db.run(`UPDATE Profiles SET
        username = '${body.username}',
        password = '${body.password}' 
        WHERE id='${param}'`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
        })
    }
}

module.exports = Profile