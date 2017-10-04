const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js')

router.get('/', (req, res)=>{
    Contact.getAll()
        .then((rows)=>{
            res.render('contact', { data: rows, title: 'Halaman Contact' })
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.post('/', (req, res) => {
    Contact.insertContact(req.body)
        .then(()=>{
            res.redirect('/contact')
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/delete/:id', (req, res) => {
    Contact.deleteContact(req.params.id)
        .then(()=>{
            res.redirect('/contact')
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.get('/edit/:id', (req, res) => {
    Contact.editContact(req.params.id)
        .then(rows=>{
            res.render('contactedit', { data: rows, title: 'Halaman Contact Edit' })
        })
        .catch(err=>{
            console.log(err);
        })
})

router.post('/edit/:id', (req, res) => {
    Contact.updateContact(req.body, req.params.id)
        .then(()=>{
            res.redirect('/contact')
        })
        .catch(err=>{
            console.log(err);
        })
})

module.exports = router;