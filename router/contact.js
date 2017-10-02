const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js')

router.get('/', (req, res)=>{
    Contact.getAll((rows) => {
        res.render('contact', { data: rows, title: 'Halaman Contact' })
    })   
})

router.post('/', (req, res) => {
    Contact.insertContact(req.body, () => {
        res.redirect('/contact')
    })
})

router.get('/delete/:id', (req, res) => {
    Contact.deleteContact(req.params.id, () => {
        res.redirect('/contact')
    })
})

router.get('/edit/:id', (req, res) => {
    Contact.editContact(req.params.id, (rows) => {
            res.render('contactedit', { data: rows, title: 'Halaman Contact Edit' })
    })
})

router.post('/edit/:id', (req, res) => {
    Contact.updateContact(req.body, req.params.id, () => {
            res.redirect('/contact')
    })
})

module.exports = router;