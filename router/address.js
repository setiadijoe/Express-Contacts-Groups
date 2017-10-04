const express = require('express');
const router = express.Router();
const Address = require('../models/address.js')
const Contact = require('../models/contact.js');

router.get('/', (req, res) => {
    Address.findAll()
    .then(rows => {
        Contact.getAll()
        .then(rows2=>{
            let nama = []
            let obj = {}
            rows2.map(arr => {
                obj["id"] = arr.id
                obj["name"] = arr.name
                nama.push(obj)
                obj = {}
            })
            rows.map((z) => {
                nama.map((arr) => {
                    if (z.ContactsId === arr.id) {
                        z["user"] = arr.name
                    }
                })
            })
            // res.send([rows, nama])
            res.render('address', { data: rows, cons:nama, title: 'Halaman Address' })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/', (req, res) => {
    Address.insertAddress(req.body)
    .then(() => {
        res.redirect('/address')
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/delete/:id', (req, res) => {
    Address.deleteAddress(req.params.id)
    .then(() => {
        res.redirect('/address')
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Address.findById(req.params.id) 
    .then(rows => {
        Contact.getAll()
        .then(rowcontacts=>{
            let nama = []
            let obj = {}
            rowcontacts.map(z => {
                obj["id"] = z.id
                obj["name"] = z.name
                nama.push(obj)
                obj = {}
            })
            // res.send([rows, nama])
            res.render('addressedit', { data: rows, cons:rowcontacts, title: 'Halaman Address Edit' })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/edit/:id', (req, res) => {
    Address.updateAddress(req.body, req.params.id)
    .then(() => {
        res.redirect('/address')
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;