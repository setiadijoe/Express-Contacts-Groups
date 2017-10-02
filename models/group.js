const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Group {
    static getAll(cb) {

        db.all(`SELECT * FROM Groups`, (err, rows) => {
            if (!err) {
                cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertGroup(param, cb) {
        db.run(`INSERT INTO Groups (name_of_group)
        VALUES ('${param.name_of_group}')`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
            })
    }

    static deleteGroup(param, cb) {
        db.run(`DELETE FROM Groups WHERE id = ${param}`, (err) => {
            if (!err) {
                cb()
            } else {
                console.log(err)
            }
        })
    }

    static editGroup(param, cb) {
        db.all(`SELECT * FROM Groups WHERE id = ${param}`, (err, rows) => {
            cb(rows)
        })
    }

    static updateGroup(body, param, cb) {
        db.run(`UPDATE Groups SET 
        name_of_group = '${body.name_of_group}'
        WHERE id='${param}'`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
            })
    }
}

module.exports = Group