const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression');
const orderRoute = require('./routes/order')
const Mailjet = require('node-mailjet');
const nodemailer = require('nodemailer')
var qs = require('querystring');


// 'mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/blog?retryWrites=true&w=majority'

// process.env.MONGODB_URI

mongoose.connect('mongodb+srv://SashkoTravel:gowno444@cluster0.xqc027t.mongodb.net/?retryWrites=true&w=majority')
    .then(() => { console.log('mongoDB ok') })
    .catch((err) => { console.log(err) })


const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }));
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

let num = 0

const http = require('http');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/api/order/mailDimaZam') {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
        const { EMAIL, PASSWORD } = process.env
        num += 1

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            }
        })

        let user = ''

        req.on('data', function (data) {
            user += data
            console.log(user);
        })

        req.on('end', function () {
            // let post = qs.parse(user);
            // console.log(post);
        });

            let mailDetails = {
                from: 'SamWash.ua',
                // to: 'Info@samwash.tech',
                to: 'vasinoleksandr1@gmail.com',
                subject: 'Замовлення консультації з SamWash.ua',
                text: `Номер консультації ${num}, `,
        // консультація для ${user?.name}, 
        // ${user?.phone ? `телефон: ${user.phone},` : ''}  
        // ${user?.email ? `пошта: ${user?.email},` : ''} 
        // ${user?.post ? `повідомлення: ${user?.post}` : ''}
        
            }

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email send');
                }
            })
        

    }
    //   res.end('Hello World!\n');
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('server work');
})
