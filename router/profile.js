const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.js')

router.get('/', (req, res) => {
    Profile.getAll((rows) => {
        res.render('profile', { data: rows, title: 'Halaman Profile' })
    })
})

router.post('/', (req, res) => {
    Profile.insertProfile(req.body, () => {
        res.redirect('/profile')
    })
})

router.get('/delete/:id', (req, res) => {
    Profile.deleteProfile(req.params.id, () => {
        res.redirect('/profile')
    })
})

router.get('/edit/:id', (req, res) => {
    Profile.editProfile(req.params.id, (rows) => {
        res.render('profileedit', { data: rows, title: 'Halaman Profile Edit' })
    })
})

router.post('/edit/:id', (req, res) => {
    Profile.updateProfile(req.body, req.params.id, () => {
        res.redirect('/profile')
    })
})

module.exports = router;