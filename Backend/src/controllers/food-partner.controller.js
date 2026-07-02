const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    try {

        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            });
        }

        const foodItemsByFoodPartner = await foodModel.find({
            foodPartner: foodPartnerId
        });

        const totalMeals = foodItemsByFoodPartner.length;

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                totalMeals: totalMeals,
                customersServed: foodPartner.customersServed || 0,
                foodItems: foodItemsByFoodPartner
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getFoodPartnerById
};