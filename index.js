const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression');
const orderRoute = require('./routes/order')


// 'mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/blog?retryWrites=true&w=majority'

// process.env.MONGODB_URI

mongoose.connect('mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('mongoDB ok') })
    .catch((err) => { console.log(err) })


const app = express()
app.use(express.json())
app.use(compression())

app.use(express.static('build'))

app.use('/order', orderRoute)
app.use('/api/order', orderRoute)

app.get('/api/users', (req, res) => {
    res.send([{
        id: 1,
        name: 'Alex'
    },{
        id: 2,
        name: 'andr'
    }])
})


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('server work');
})
