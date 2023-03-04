const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const orderRoute = require('./routes/order')


// 'mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/blog?retryWrites=true&w=majority'

// process.env.MONGODB_URI

mongoose.connect('mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('mongoDB ok') })
    .catch((err) => { console.log(err) })


const app = express()
app.use(express.json())
app.use(cors())


app.use('/order', orderRoute)


app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('server work');
})