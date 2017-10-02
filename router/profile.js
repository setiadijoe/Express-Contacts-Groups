const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.js')

router.get('/', (req, res) => {
    Profile.getAll((rows, rowcontacts) => {
        // res.send(rows)
        res.render('profile', { data: rows, datacontacts:rowcontacts, sendError:'', title: 'Halaman Profile' })
    })
})

router.post('/', (req, res) => {
    Profile.insertProfile(req.body, (err) => {
        if (err){
            // console.log('lalalalalla')
            Profile.getAll((rows, rowcontacts) => {
                // res.send(rows)
                res.render('profile', { data: rows, datacontacts: rowcontacts, sendError: 'Contact sudah punya profile', title: 'Halaman Profile' })
            })
            // res.redirect('/profile')
            // res.send(err)
        } else {
            // res.send()
            res.redirect('/profile')
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Profile.deleteProfile(req.params.id, () => {
        res.redirect('/profile')
    })
})

router.get('/edit/:id', (req, res) => {
    Profile.editProfile(req.params.id, (rows) => {
        // res.send(rows)
        Profile.getAll((rowcontacts)=>{
            res.render('profileedit', { data: rows, cons: rowcontacts, title: 'Halaman Profile Edit' })
        })
       
    })
})

router.post('/edit/:id', (req, res) => {
    Profile.updateProfile(req.body, req.params.id, () => {
        res.redirect('/profile')
    })
})

module.exports = router;