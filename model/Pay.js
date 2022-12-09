const mongoose = require('mongoose')

const PaySchema = new mongoose.Schema({
    total: Number,
    order: [{
        id: Number,
        nameOfGoods: String,
        prise: Number,
        size: Number,
        discount: String,
        total: Number
    }],
    user: {
        name: String,
        phone: Number,
        email: String,
        cite: String
        // district: String
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
},
    { timestamps: true },
)


module.exports = mongoose.model("Pay", PaySchema)