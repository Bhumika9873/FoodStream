const mongoose = require('mongoose');

const FoodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    totalMeals: {
        type: Number,
        default: 0
    },

    customersServed: {
        type: Number,
        default: 25
    }

});

const foodPartnerModel = mongoose.model("foodpartner", FoodPartnerSchema);

module.exports = foodPartnerModel;