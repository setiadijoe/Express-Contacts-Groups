const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.js')
const Contact = require('../models/contact.js');

router.get('/', (req, res) => {
    let errorMessage = ''
    
    if(req.query.hasOwnProperty('error')) {
        if (req.query.error === 'Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: Profiles.ContactsId') {
            errorMessage = 'Data Contacts sudah ada'
        }
    }

    Profile.getAll()
        .then(rows => {
            Contact.getAll()
            .then(rows2=>{
                let nama = []
                let obj = {}
                rows2.map(arr=>{
                    obj["id"] = arr.id
                    obj["name"] =  arr.name
                    nama.push(obj)
                    obj ={}
                })
                rows.map((z)=>{
                    nama.map((arr)=>{
                        if(z.ContactsId === arr.id) {
                            z["user"] = arr.name
                        }
                    })
                })
                res.render('profile', { data: rows, datacontacts: nama, sendError: errorMessage, title: 'Halaman Profile' })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/', (req, res) => {
    Profile.insertProfile(req.body)
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => {
            res.redirect(`/profile?error=${err}`)
        })
})

router.get('/delete/:id', (req, res) => {
    Profile.deleteProfile(req.params.id)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    let errorMessage = ''

    if (req.query.hasOwnProperty('error')) {
        if (req.query.error === `Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: Profiles.ContactsId`) {
            errorMessage = 'Data Contacts sudah ada'
        }
    }

    Profile.findById(req.params.id)
    .then(rows=> {
        Contact.getAll()
        .then(rowscont=>{
            let nama = []
            let obj = {}
            rowscont.map(z=>{
                obj["id"] = z.id
                obj["name"] = z.name
                nama.push(obj)
                obj = {}
            })
            res.render('profileedit', { data: rows, cons: nama, sendError: errorMessage, title: 'Halaman Profile Edit' })
        })    
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/edit/:id', (req, res) => {
    Profile.updateProfile(req.body, req.params.id)
    .then(()=>{
        res.redirect(`/profile`)
    })
    .catch(err => {
        res.redirect(`/profile/edit/${req.params.id}?error=${err}`)
    })
})

module.exports = router;