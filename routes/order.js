const router = require('express').Router()
require('dotenv').config()
const nodemailer = require('nodemailer')
const { checkAuth } = require('../utils/checkAuth')
const { registerValidation, loginValidation } = require('../validations')
const PaySchema = require('../model/Pay')


router.post('/pay', checkAuth, async (req, res) => {
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


router.post('/mail', checkAuth, async (req, res) => {
    try { 
    //    console.log(req.body);

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
            from: 'vasinoleksandr1@gmail.com',
            to: userData.email,
            subject: 'Це ваше замовлення',
            text: `Доброго дня ${userData.name}, компанія "ООО", ось ваше замовлення ${massage}`
        }

        res.json({ result: await transporter.sendMail(mailOptions) })
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to register')
    }
})



module.exports = router