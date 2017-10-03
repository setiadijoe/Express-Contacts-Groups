const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db')
const contact = require('./contact.js')
const CG = require('./contactgroups')

class Group {
    constructor(id, name_of_group){
        this.id = id
        this.name_of_group = name_of_group
    }

    static getGroup(cb) {
        db.all(`SELECT G.id, G.name_of_group FROM Groups G`, (err, rows)=>{
            rows.map(add=>{
                let group = new Group(add.id, add.name_of_group)
                cb(group)
            })
        })
    }

    // static memberGroup(cb) {

    //     db.all(`SELECT G.id, C.name, G.name_of_group, CG.GroupsId, CG.ContactsId FROM Groups G 
    //     JOIN ContactGroups CG ON G.id = CG.GroupsId 
    //     JOIN Contacts C ON CG.ContactsId = C.id`, (err, rows) => {
    //         if (!err) {
    //             console.log(rows)
    //             cb(rows)
    //         } else {
    //             console.log(err)
    //         }
    //     })
    // }

    static findAll(cb) {
        db.all(`SELECT * FROM Groups `, (err, rows) => {
            if(!err){
                cb(rows)
            } else {
                console.log(err);
            }
        })
    }

    //router
    /**
     * router.get('/', function) {
     *  Group.findAll(function(rows) {
     *     rows.forEach((row, index) => {
     *      Group.getContactName(row.id, function(data) {
     *          row.contact_name = data.contact_nama;
     * 
     *          if(index >= rows.length - 1) {
     *            res.send(rows)
     *          }
     *      }) 
     *     })
     *  })
     * }
     */

    static getContactName(idGroup, cb) {
        //ContactGroup
        //select * ContactGroup left join Contact on ContactGroup.contactId = contact.id where ContactGroup.groupId = ${idGroup}
        //
        db.all(`SELECT CG.GroupsId, CG.ContactsId, C.name FROM ContactGroups CG JOIN Contacts C ON CG.ContactsId = C.id 
        WHERE CG.GroupsId = '${idGroup}'`, function(err, rows2){
            if(!err){
                cb(rows2)
            } else {
                console.log(err);
            }
        })

    }

    static getAll(cb) {
        db.all(`SELECT * FROM Groups `, (err, rows)=>{
            db.all(`SELECT CG.*, C.name FROM ContactGroups CG 
            JOIN Contacts C ON CG.ContactsId = C.id`, (err, rows2)=>{
                if (err){
                    res.send(err)
                } else {
                    // console.log(rows)
                    let consData = rows.map(y=>{
                        // console.log(y)
                        y["datamember"]=[]
                        let dataconst = rows2.map(z=>{
                            // console.log('ini punya z',z)
                            if(z.GroupsId == y.id){
                                return y.datamember.push(z.name)
                            }
                        })
                        // console.log('punya y',y)
                        return y
                    })
                    cb(err, consData)
                }
            })
        })
    }

    static getGroupById(param, cb) {
        db.get(`SELECT * FROM Groups WHERE Groups.id = ${param.id}`, function(err, rows){
            db.all(`SELECT Contacts.id, Contacts.name FROM Contacts `, function(err, rows2){
                if (err){
                    console.log(err)
                } else {
                    cb(rows, rows2)
                }
            })
        })
    }

    static addMember(param, body, cb){
        let query = `INSERT INTO ContactGroups (GroupsId, ContactsId) 
        VALUES ('${param.id}', '${body.ContactsId}')`;
        db.run(query, (err)=>{
            if(err){
                console.log(err)
            } else {
                cb()
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

    static getContact(idGroup) {
        //

    }
}

module.exports = Group