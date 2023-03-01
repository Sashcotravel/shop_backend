const mongoose = require('mongoose')

const PaySchema = new mongoose.Schema({
    total: Number,
    order: [{
        id: Number,
        nameOfGoods: String,
        src: String,
        src2: String,
        nameImg: String,
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