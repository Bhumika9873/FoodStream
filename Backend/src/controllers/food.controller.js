const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.models');
const saveModel = require('../models/save.model');

async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Video file required" });
        }

        if (!req.foodPartner) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const videoUrl = `http://localhost:3000/uploads/${req.file.filename}`;

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: videoUrl,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "food created successfully",
            food: foodItem
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            liked: false
        });
    }

    await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    return res.status(201).json({
        liked: true
    });
}


async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        });

        return res.status(200).json({
            message: "Food unsaved successfully"
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    });

    res.status(201).json({
        message: "Food saved successfully",
        save
    });
}

async function getSaveFood(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};
