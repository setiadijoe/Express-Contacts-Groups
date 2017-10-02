const express = require('express');
const router = express.Router();
const Groups = require('../models/group.js')

router.get('/', (req, res) => {
    Groups.getAll((rows) => {
        res.render('group', { data: rows, title: 'Halaman Group' })
    })
})

router.post('/', (req, res) => {
    Groups.insertGroup(req.body, () => {
        res.redirect('/group')
    })
})

router.get('/delete/:id', (req, res) => {
    Groups.deleteGroup(req.params.id, () => {
        res.redirect('/group')
    })
})

router.get('/edit/:id', (req, res) => {
    Groups.editGroup(req.params.id, (rows) => {
        res.render('groupedit', { data: rows, title: 'Halaman Group Edit' })
    })
})

router.post('/edit/:id', (req, res) => {
    Groups.updateGroup(req.body, req.params.id, () => {
        res.redirect('/group')
    })
})

module.exports = router;