const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression');
const orderRoute = require('./routes/order')
const Mailjet = require('node-mailjet');
const nodemailer = require('nodemailer')
var qs = require('querystring');
var smtpTransport = require('nodemailer-smtp-transport');


// 'mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/blog?retryWrites=true&w=majority'

// process.env.MONGODB_URI

mongoose.connect('mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('mongoDB ok') })
    .catch((err) => { console.log(err) })


const app = express()
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));
app.use(compression())
app.use(express.static('build'))


app.use('/order', orderRoute)
app.use('/api/order', orderRoute)

app.get('/api/users', (req, res) => {
    res.send([{
        id: 1,
        name: 'Alex'
    }, {
        id: 2,
        name: 'andr'
    }])
})

// let num = 0

// const http = require('http');

// const hostname = 'localhost';
// const port = 8080;

// const server = http.createServer(async (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     if (req.url === '/api/order/mailDimaZam') {

//         process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
//         const { EMAIL, PASSWORD } = process.env
//         num += 1

//         const mailjet = new Mailjet({
//             apiKey: process.env.MJ_APIKEY_PUBLIC,
//             apiSecret: process.env.MJ_APIKEY_PRIVATE
//         });

//         let user = ''

//         req.on('data', function (data) {
//             user += data
//             console.log(user);
//         })


//         const request = mailjet
//             .post('send', { version: 'v3.1' })
//             .request({
//                 Messages: [{
//                         From: { Email: 'no-reply@samwash.ua', Name: "SamWash" },
//                         To: [ { Email: "Info@samwash.tech", Name: "Dmytro" } ],
//                         Subject: "Замовлення консультації з SamWash.ua",
//                         HTMLPart: `Номер консультації ${num}, <br />`
//                     // ${user?.name ? `консультація для: ${user.name},` : ''}<br />
//                     //  ${user?.phone ? `телефон: ${user.phone},` : ''}<br />
//                     //  ${user?.email ? `пошта: ${user?.email},` : ''}<br />
//                     //  ${user?.post ? `повідомлення: ${user?.post}` : ''}
//                     //  `
//                         // HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
//                         // TextPart
//                     }]
//             })

//         request.then((result) => { console.log(req.body) })
//             .catch((err) => { console.log(err.originalMessage, err.statusCode) })

//     }
//     //   res.end('Hello World!\n');
// });



// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('server work');
})
