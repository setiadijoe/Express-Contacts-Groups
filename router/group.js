const express = require('express');
const router = express.Router();
const Groups = require('../models/group.js')

// router.get('/', (req, res) => {
//     Groups.getAll((err, consData) => {
//         consData.map(z=>{
//             if(z.datamember.length == 0){
//                 z.datamember.push('belum ada member')
//             }
//         })
//         res.render('group', { data: consData, title: 'Halaman Group' })
//     })
// })

router.get('/add/:id', (req, res)=>{
    Groups.getGroupById(req.params, (rows, rows2)=>{
        res.render('groupadd',{data:rows, datacontacts: rows2, title:'Halaman Add Group'})
    })
})

router.post('/add/:id', (req, res)=>{
    // console.log("========", req.body)
    Groups.addMember(req.params, req.body, ()=>{
        res.redirect('/group')
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

router.get('/', function(req, res){
    Groups.findAll((rows)=>{
        console.log(rows)
        rows.forEach((r)=>{
            console.log(r.id)
            Groups.getContactName(r.id, function(rows2){
                r["contactName"] = []
                console.log('ini rows2',rows2)
                rows2.map(x=>{
                    r.contactName.push(x.name)
                    return r
                })
                console.log('ini huruf r',r);
                res.send(r)
            })
        })
    })
})

module.exports = router;