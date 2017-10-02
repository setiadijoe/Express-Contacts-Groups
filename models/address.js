const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Address {
    static getAll(cb) {

        db.all(`SELECT A.id, A.street, A.city, A.zipcode, C.name FROM Addresses A JOIN Contacts C ON A.ContactsId = C.id`, (err, rows) => {
            if (!err) {
                db.all(`SELECT id, name FROM Contacts`, (err, rowcontacts) => {
                    if (!err) {
                        cb(rows, rowcontacts)
                    } else {
                        console.log(err)
                    }
                })
                // cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertAddress(param, cb) {
        db.run(`INSERT INTO Addresses (street, city, zipcode, ContactsId)
        VALUES ('${param.street}','${param.city}','${param.zipcode}',${param.ContactsId})`, (err) => {
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
        db.all(`SELECT A.id, A.street, A.city, A.zipcode, C.name FROM Addresses A JOIN Contacts C ON A.ContactsId = C.id WHERE A.id = ${param}`, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                cb(rows)
            }
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

module.exports = Address