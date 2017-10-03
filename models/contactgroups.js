const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')

class ContactGroup {

    static getContact(groupid, cb) {
        db.get(`SELECT CG.id, CG.GroupsId, CG.ContactsId FROM ContactGroups CG 
        JOIN Contact C ON CG.ContactsId = C.id WHERE CG.ContactsId = ${groupid}`, function(err, rows){
            cb(rows)
        })
    }
}

module.exports= ContactGroup