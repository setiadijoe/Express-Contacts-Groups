const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Addresses {
    static getAll(cb) {

        db.all(`SELECT * FROM Addresses`, (err, rows) => {
            if (!err) {
                cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertAddress(param, cb) {
        db.run(`INSERT INTO Addresses (street, city, zipcode)
        VALUES ('${param.street}','${param.city}','${param.zipcode}')`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
            })
    }

    static deleteAddress(param, cb) {
        db.run(`DELETE FROM Addresses WHERE id = ${param}`, (err) => {
            if (!err) {
                cb()
            } else {
                console.log(err)
            }
        })
    }

    static editAddress(param, cb) {
        db.all(`SELECT * FROM Addresses WHERE id = ${param}`, (err, rows) => {
            cb(rows)
        })
    }

    static updateAddress(body, param, cb) {
        db.run(`UPDATE Addresses SET
        street = '${body.street}',
        city = '${body.city}',
        zipcode = '${body.zipcode}' 
        WHERE id='${param}'`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
            })
    }
}

module.exports = Addresses