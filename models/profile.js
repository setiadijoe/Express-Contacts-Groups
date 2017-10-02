const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Profile {
    static getAll(cb) {

        db.all(`SELECT * FROM Profiles`, (err, rows) => {
            if (!err) {
                cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertProfile(param, cb) {
        db.run(`INSERT INTO Profiles (username, password)
        VALUES ('${param.username}','${param.password}')`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
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
        db.all(`SELECT * FROM Profiles WHERE id = ${param}`, (err, rows) => {
            cb(rows)
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