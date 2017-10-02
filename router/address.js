const express = require('express');
const router = express.Router();
const Address = require('../models/address.js')

router.get('/', (req, res) => {
    Address.getAll((rows, rowcontacts) => {
        // res.send(rows)
        res.render('address', { data: rows, cons:rowcontacts, title: 'Halaman Address' })
    })
})

router.post('/', (req, res) => {
    Address.insertAddress(req.body, () => {
        res.redirect('/address')
    })
})

router.get('/delete/:id', (req, res) => {
    Address.deleteAddress(req.params.id, () => {
        res.redirect('/address')
    })
})

router.get('/edit/:id', (req, res) => {
    Address.editAddress(req.params.id, (rows) => {
        Address.getAll((rowcontacts)=>{
            res.render('addressedit', { data: rows, cons:rowcontacts, title: 'Halaman Address Edit' })
        })
    })
})

router.post('/edit/:id', (req, res) => {
    Address.updateAddress(req.body, req.params.id, () => {
        res.redirect('/address')
    })
})

module.exports = router;