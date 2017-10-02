const express = require('express');
const router = express.Router();
const Address = require('../models/address.js')

router.get('/', (req, res) => {
    Address.getAll((rows) => {
        res.render('address', { data: rows, title: 'Halaman Address' })
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
        res.render('addressedit', { data: rows, title: 'Halaman Address Edit' })
    })
})

router.post('/edit/:id', (req, res) => {
    Address.updateAddress(req.body, req.params.id, () => {
        res.redirect('/address')
    })
})

module.exports = router;