const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Address {
    constructor(id, street, city, zipcode){
        this.id      = id
        this.street  = street
        this.city    = city
        this.zipcode = zipcode
    }

    static getAddress(cb) {
        db.all(`SELECT A.id, A.street, A.city, A.zipcode FROM Addresses A`, (err, rows)=>{
            if(!err){
                rows.map(add => {
                    let address = new Address(add.id, add.street, add.city, add.zipcode)
                    cb(address)
                })
            }
        })
    }

    static findAll() {
        let query = `SELECT * FROM Addresses`
        let promise = new Promise(function(resolve, reject) {
            db.all(query, (err, rows) => {
                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }
            })    
        });
        return promise
    }

    static insertAddress(param) {
        let query = `INSERT INTO Addresses (street, city, zipcode, ContactsId)
        VALUES ('${param.street}','${param.city}',${param.zipcode},${param.ContactsId})`

        let promise = new Promise(function(resolve, reject) {
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

    static deleteAddress(param) {
        let query = `DELETE FROM Addresses WHERE id = ${param}`

        let promise = new Promise(function(resolve, reject) {
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

    static findById(param) {
        let query = `SELECT * FROM Addresses WHERE id = ${param}`

        let promise = new Promise(function(resolve, reject) {
            db.get(query, (err, rows) => {
                if (!err) {
                    resolve(rows)
                } else {
                    reject(err)
                }
            })
        });
        return promise
    }

    static updateAddress(body, param, cb) {
        let query = `UPDATE Addresses SET
        street = '${body.street}',
        city = '${body.city}',
        zipcode = ${body.zipcode},
        ContactsId = ${body.ContactsId} 
        WHERE id=${param}`

        let promise = new Promise(function(resolve, reject) {
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

module.exports = Address