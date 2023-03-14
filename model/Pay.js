const mongoose = require('mongoose')

const PaySchema = new mongoose.Schema({
    total: Number,
    order: [{
        id: Number,
        nameOfGoods: String,
        nameImg: String,
        nameWebp: String,
        prise: Number,
        size: Number,
        discount: String,
        total: Number
    }],
    user: {
        name: String,
        phone: String,
        email: String,
        cite: String,
        date: String
    }
},
    { timestamps: true },
)


module.exports = mongoose.model("Pay", PaySchema)