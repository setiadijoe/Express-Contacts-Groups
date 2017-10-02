var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/data.db');

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         name VARCHAR(255), 
         company VARCHAR(255), 
         telp_number VARCHAR(255), 
         email VARCHAR(255))`, (err)=>{
             if(err){
                 console.log(err)
             } else {
                 console.log('Table Contacts berhasil dibuat')
             }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         name_of_group VARCHAR(255))`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Table Groups berhasil dibuat')
            }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         username VARCHAR(255), 
         password VARCHAR(255))`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Table Profiles berhasil dibuat')
            }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street VARCHAR(255), 
        city VARCHAR(255), 
        zipcode INTEGER)`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Table Addresses berhasil dibuat')
            }
    });

    // db.run(`ALTER TABLE Profiles ADD ContactsId REFERENCES Contacts(id)`, (err)=>{
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log('Foreign Key ContactsId di Profiles Berhasil')
    //     }
    // })

    db.run(`CREATE UNIQUE INDEX ContactsId ON Profiles(ContactsId)`, (err)=>{
        if (err) {
            throw err;
        } else {
            console.log(' UNIQUE Key ContactsId di Profiles Berhasil')
        }
    })

});