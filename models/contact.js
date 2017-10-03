const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class Contact {
    constructor(id, name, company, telp_number, email){
        this.id         = id
        this.name       = name
        this.company    = company
        this.telp_number= telp_number
        this.email      = email
    }

    static getContact(cb) {
        db.all(`SELECT C.id, C.name, C.company, C.telp_number, C.email FROM Contacts C`, (err, rows)=>{
            if(!err){
                rows.map(add=>{
                    let contact = new Contact(add.id, add.name, add.company, add.telp_number, add.email)
                    cb(contact)
                })
            }
        })
    }

    static getAll(cb) {

        db.all(`SELECT * FROM Contacts`, (err, rows) => {
            if (!err) {
                cb(rows)
            } else {
                console.log(err)
            }
        })
    }

    static insertContact(param, cb) {
        db.run(`INSERT INTO Contacts (name, company, email, telp_number)
        VALUES ('${param.name}','${param.company}','${param.email}','${param.telp_number}')`, (err) => {
                if (!err){
                    cb()
                } else {
                    console.log(err)
                }   
            })
    }

    static deleteContact(param, cb) {
        db.run(`DELETE FROM Contacts WHERE id = ${param}`, (err) => {
            if (!err) {
                cb()
            } else {
                console.log(err)
            }  
        })
    }

    static editContact(param, cb) {
        db.all(`SELECT * FROM Contacts WHERE id = ${param}`, (err, rows) => {
            cb(rows)
        })
    }

    static updateContact(body, param, cb) {
        db.run(`UPDATE Contacts SET
        name = '${body.name}',
        company = '${body.company}',
        email = '${body.email}',
        telp_number ='${body.telp_number}' WHERE id='${param}'`, (err) => {
                if (!err) {
                    cb()
                } else {
                    console.log(err)
                }
            })
    }

    

}

module.exports = Contact