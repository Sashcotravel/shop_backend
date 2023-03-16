const router = require('express').Router()
require('dotenv').config()
const nodemailer = require('nodemailer')
const PaySchema = require('../model/Pay')
let ejs = require('ejs')
let pdf = require('html-pdf')
let path = require('path')
const { dirname } = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const querystring = require('querystring')
const idAutoIncrement = require("id-auto-increment");
const Mailjet = require('node-mailjet');

let num = 0


router.post('/pay', async (req, res) => {
    try {

        const order = new PaySchema({
            order: req.body.obj.order,
            total: req.body.obj.total,
            user: req.body.obj.user
        })


        const userOrder = await order.save()

        // console.log(userOrder._id.toString());

        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = ''
        let userOrderId

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        userOrderId = userOrder._id.toString() + password

        res.json(userOrderId)
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

router.get('/fetchOrder/:id', async (req, res) => {
    try {

        const userOrder = await PaySchema.find({ _id: req.params.id }).exec();

        const order = {
            total: userOrder[0].total,
            order: userOrder[0].order,
            createdAt: userOrder[0].createdAt
        }

        res.json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

router.post('/mail', async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const { user } = req.body

    const { EMAIL, PASSWORD } = process.env


    ejs.renderFile(
        path.join(__dirname, '../views/', 'report-template.ejs'),
        {
            order: req.body
        },
        (err, data) => {
            if (err) {
                res.send(err)
            } else {
                let option = {
                    height: '11.25in',
                    width: '8.5in',
                    header: {
                        height: '20mm'
                    },
                    footer: {
                        height: '20mm'
                    }
                }
                pdf.create(data, option).toFile('order.pdf', function (err, data) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send('File create successfully')
                        let mailTransporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: EMAIL,
                                pass: PASSWORD,
                            }
                        })
                        let mailDetails = {
                            from: EMAIL,
                            to: EMAIL,
                            subject: 'Замовлення від покупця з CalculatorSamWash.ua',
                            text: `Замовлення від покупця ${user.name}, 
                            ${user.phone ? `телефон: ${user.phone},` : ''}  
                            ${user.email ? `пошта: ${user.email},` : ''} 
                            ${req.body.checked ? 'Не дзвоніть мені.' : 'також замовив консультацію.'}`,
                            attachments: [
                                {
                                    path: data.filename
                                }
                            ]
                        }
                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Email send');
                            }
                        })
                    }
                })
            }
        }
    )
})

router.post('/mailDima', async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const { user } = req.body

    const { EMAIL, PASSWORD } = process.env


    ejs.renderFile(
        path.join(__dirname, '../views/', 'report-template.ejs'),
        {
            order: req.body
        },
        (err, data) => {
            if (err) {
                res.send(err)
            } else {
                let option = {
                    height: '11.25in',
                    width: '8.5in',
                    header: {
                        height: '20mm'
                    },
                    footer: {
                        height: '20mm'
                    }
                }
                pdf.create(data, option).toFile('order.pdf', function (err, data) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send('File create successfully')
                        let mailTransporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: EMAIL,
                                pass: PASSWORD,
                            }
                        })
                        let mailDetails = {
                            from: EMAIL,
                            to: 'Info@samwash.tech',
                            subject: 'Замовлення покупця з CalculatorSamWash.ua',
                            text: `Замовлення від покупця ${user.name}, 
                            ${user.phone ? `телефон: ${user.phone},` : ''}  
                            ${user.email ? `пошта: ${user.email},` : ''} 
                            ${req.body.checked ? 'Не дзвоніть мені.' : 'також замовив консультацію.'}`,
                            attachments: [
                                {
                                    path: data.filename
                                }
                            ]
                        }
                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Email send');
                            }
                        })
                    }
                })
            }
        }
    )
})

// router.post('/mailDimaZam', async (req, res) => {

//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

//     const { user } = req.body

//     const { EMAIL, PASSWORD } = process.env


//     const id = await idAutoIncrement({});
//     num +=1

//     let mailTransporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: EMAIL,
//             pass: PASSWORD,
//         }
//     })

//     let mailDetails = {
//         from: 'SamWash.ua',
//         // to: 'Info@samwash.tech',
//         to: 'vasinoleksandr1@gmail.com',
//         subject: 'Замовлення консультації з SamWash.ua',
//         text: `Номер консультації ${num}, 
//         консультація для ${user?.name}, 
//         ${user?.phone ? `телефон: ${user.phone},` : ''}  
//         ${user?.email ? `пошта: ${user?.email},` : ''} 
//         ${user?.post ? `повідомлення: ${user?.post}` : ''}`,
//     }

//     mailTransporter.sendMail(mailDetails, function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Email send');
//         }
//     })
// }
// )

router.post('/mailUser', async (req, res) => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

        const { user } = req.body


        const { EMAIL, PASSWORD } = process.env

        ejs.renderFile(
            path.join(__dirname, '../views/', 'report-template.ejs'),
            {
                order: req.body
            },
            (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    let option = {
                        height: '11.25in',
                        width: '8.5in',
                        header: {
                            height: '20mm'
                        },
                        footer: {
                            height: '20mm'
                        }
                    }
                    pdf.create(data, option).toFile('order.pdf', function (err, data) {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send('File create successfully')
                            let mailTransporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: EMAIL,
                                    pass: PASSWORD,
                                }
                            })
                            let mailDetails = {
                                from: EMAIL,
                                to: user.email,
                                subject: 'Ваше замовлення',
                                text: `Доброго дня ${user.name}, ваш запит прийнято. Ми зв'яжемось з вами найближчим часом`,
                                attachments: [
                                    {
                                        path: data.filename,
                                    },
                                    {
                                        path: `${__dirname}/img/tableSamWash.pdf`,
                                    }
                                ]
                            }
                            mailTransporter.sendMail(mailDetails, function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Email send');
                                }
                            })
                        }
                    })
                }
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

router.post('/mailDimaMiyka', async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const { user } = req.body

    const { EMAIL, PASSWORD } = process.env

    const id = await idAutoIncrement({});

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        }
    })

    let mailDetails = {
        from: user.email,
        to: 'Info@samwash.tech',
        subject: 'Мийка яка зацікавила',
        text: `Зацікавила ${user.name}, 
        ${user.phone ? `телефон: ${user.phone},` : ''}  
        ${user.email ? `пошта: ${user.email},` : ''} 
        микка: ${req.body.link}`,
    }

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send');
        }
    })
}
)

router.post('/mailUserMiyka', async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const { user } = req.body

    const { EMAIL, PASSWORD } = process.env

    const id = await idAutoIncrement({});

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        }
    })

    let mailDetails = {
        from: 'Info@samwash.tech',
        to: user.email,
        subject: 'Мийка яка зацікавила',
        text: `Дякуюмо за цікавість, в скорому часі ми з вами зв'яжимось.`,
    }

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send');
        }
    })
}
)

router.post('/reCaptcha', async (req, res) => {

    let params = {
        secret: process.env.SECRET,
        response: req.body.gtoken
    }

    try {
        let result = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            querystring.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        // return result.data.success
        res.json(result.data.success)
    } catch (e) {
        console.log(e);
    }
})









router.post('/mailDimaZam', async (req, res) => {

    const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE
    });

    num = num + 1

    const { user } = req.body

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: 'no-reply@samwash.ua',
                        Name: "SamWash"
                    },
                    To: [
                        {
                            Email: "Info@samwash.tech",
                            Name: "Dmytro"
                        }
                    ],
                    Subject: "Замовлення консультації з SamWash.ua",
                    HTMLPart: `Номер консультації ${num}, <br />
                    ${user?.name ? `консультація для: ${user.name},` : ''}<br />
                     ${user?.phone ? `телефон: ${user.phone},` : ''}<br />
                     ${user?.email ? `пошта: ${user?.email},` : ''}<br />
                     ${user?.post ? `повідомлення: ${user?.post}` : ''}`
                    // HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                    // TextPart
                }
            ]
        })

    request
        .then((result) => {
            console.log(req.body);
        })
        .catch((err) => {
            console.log(err.originalMessage, err.statusCode)
        })
        

})



module.exports = router