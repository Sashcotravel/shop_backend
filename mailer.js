require('dotenv').config()
const nodemailer = require('nodemailer')
 
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const { EMAIL, PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vasinoleksandr1@gmail.com',
        pass: 'sxrjcqqigzpwaizf',
    }
})


const mailOptions = {
    from: 'vasinoleksandr1@gmail.com',
    to: 'vasinoleksandr910@gmail.com',
    subject: 'Its all OK',
    text: 'your are genius'
}

transporter.sendMail(mailOptions)

// "start": "nodemon index.js",
// "start": "node mailer.js"