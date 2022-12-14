const router = require('express').Router()
require('dotenv').config()
const nodemailer = require('nodemailer')
const PaySchema = require('../model/Pay')
let ejs = require('ejs')
let pdf = require('html-pdf')
let path = require('path')
const { dirname } = require('path')


router.post('/pay', async (req, res) => {
    try {
        // console.log(req.body.obj);

        const order = new PaySchema({
            order: req.body.obj.order,
            total: req.body.obj.total,
            user: req.body.obj.user
        })

        const userOrder = await order.save()

        res.json(userOrder)
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})


router.get('/fetchOrder/:id', async (req, res) => {
    try {
        // console.log(req.params.id);

        const userOrder = await PaySchema.find({_id: req.params.id}).exec();

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

    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

    const { user } = req.body

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
                            subject: '???????????????????? ??????????????',
                            text: `${user.date ? user.name + ' ?????????????? ???????????????????????? ???? ' + user.date  : user.name + ' ???????????? ????????????????????'}`,
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

router.post('/mailDima', async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

    const { user } = req.body

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
                            to: 'Info@samwash.tech', 
                            subject: '???????????????????? ??????????????',
                            text: `${user.date ? user.name + ' ?????????????? ???????????????????????? ???? ' + user.date  : user.name + ' ???????????? ????????????????????'}`,
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

router.post('/mailUser', async (req, res) => {
    try { 
        process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

        const { user } = req.body

        // console.log(__dirname);

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
                                to: user.email, 
                                subject: '???????? ????????????????????',
                                text: `?????????????? ?????? ${user.name}, ???????????????? "??????", ???????? ???????????????????? ?? ?????????????? ${user.date ? ', ?? ???????? ???????????????????????? ???? '+ user.date : ''}`,
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
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})

module.exports = router