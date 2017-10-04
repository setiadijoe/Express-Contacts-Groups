const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Profile {
    constructor(id, username, password, ContactsId){
        this.id       = id
        this.username = username
        this.password = password
        this.ContactsId = ContactsId
    }

    getProfile(cb){
        db.all(`SELECT P.id, P.username, P.password FROM Profile P`, (err, rows)=>{
            rows.map(add=>{
                let profile = new Profile(add.id, add.username, add.password, add.ContactsId)
                cb(profile)
            })
        })
    }

    static getAll() {
        let promise = new Promise(function(resolve, reject) {
            db.all(`SELECT P.id, P.username, P.password, P.ContactsId FROM Profiles P`, (err, rows) => {
                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        });
        return promise
    }

    static insertProfile(param) {
        let promise = new Promise(function(resolve, reject) {
            db.run(`INSERT INTO Profiles (username, password, ContactsId)
            VALUES ('${param.username}','${param.password}',${param.ContactsId})`, (err) => {
                    if (!err) {
                        resolve()
                    } else {
                        reject(err)
                    }
            })
        });
        return promise
    }

    static deleteProfile(param) {
        let promise = new Promise(function(resolve, reject) {
            db.run(`DELETE FROM Profiles WHERE id = ${param}`, (err) => {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        });
        return promise
    }

    static findById(param) { //UBAH jadi findById
        let promise = new Promise(function(resolve, reject) {
            db.get(`SELECT P.id, P.username, P.password, P.ContactsId FROM Profiles P  WHERE P.id = ${param}`, (err, rows) => {
                if (err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        });
        return promise
    }

    static updateProfile(body, param) {
        let query = `UPDATE Profiles SET
            username = '${body.username}',
            password = '${body.password}',
            ContactsId = ${body.ContactsId} 
            WHERE id =${param}`;
        
        let promise =  new Promise(function(resolve, reject) {
            db.run(query, (err) => {
                    if (!err) {
                        resolve()
                    } else {
                        reject(err)
                    }
            })
        });
        return promise
    }
}

module.exports = Profile