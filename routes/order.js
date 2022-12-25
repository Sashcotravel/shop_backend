const router = require('express').Router()
require('dotenv').config()
const nodemailer = require('nodemailer')
const PaySchema = require('../model/Pay')
let ejs = require('ejs')
let pdf = require('html-pdf')
let path = require('path')


router.post('/pay', async (req, res) => {
    try {
        // console.log(req.body.obj);

        const order = new PaySchema({
            order: req.body.obj.order,
            total: req.body.obj.total,
            user: req.body.obj.user
        })

        const userOrder = await order.save()

        console.log(userOrder);

        res.json(userOrder)
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

router.post('/generation', (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

    const { userData, massage } = req.body

    const { EMAIL, PASSWORD } = process.env

    ejs.renderFile(
        path.join(__dirname, '../views/', 'report-template.ejs'),
        {
            order: req.body
        },
        (err, data) => {
            if(err){
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
                    if(err) {
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
                            subject: 'Замовлення покупця',
                            text: 'Your order',
                            attachments: [
                                {
                                    path: data.filename
                                }
                            ]
                        }
                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if(err) {
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

router.post('/mail', async (req, res) => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

        const { userData, massage } = req.body

        const { EMAIL, PASSWORD } = process.env

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            }
        })

        const mailOptions2 = {
            from: EMAIL,
            to: EMAIL,
            subject: 'Це замовлення покупця',
            text: `Доброго дня госполар, компанія "ООО", ось замовлення покупця, ${userData.date ? 'і ще є консультація на '+ userData.date : ''}`
        }

        transporter.sendMail(mailOptions2)
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

router.post('/mailUser', async (req, res) => {
    try { 
        process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

        const { userData, massage } = req.body

        const { EMAIL, PASSWORD } = process.env

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            }
        })

        const mailOptions = {
            from: EMAIL,
            to: userData.email,
            subject: 'Це ваше замовлення',
            text: `Доброго дня ${userData.name}, компанія "ООО", ось ваше замовлення ${massage} ${userData.date ? ', і консультація на '+ userData.date : ''}`
        }

        res.json({ result: await transporter.sendMail(mailOptions) })
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

module.exports = router