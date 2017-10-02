const express = require('express')
const app = express()
const bodyparser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/data.db');

const index = require('./router/index.js')
const contact = require('./router/contact.js')
const profile = require('./router/profile.js')
const address = require('./router/address.js')
const group = require('./router/group.js')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

app.set('view engine', 'ejs')

app.use('/', index)
app.use('/contact', contact)
app.use('/address', address)
app.use('/profile', profile)
app.use('/group', group)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})