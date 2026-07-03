const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.models');
const saveModel = require('../models/save.model');
const commentModel = require("../models/comment.model");

async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Video file required"
            });
        }

        if (!req.foodPartner) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        console.log("========== FILE ==========");
        console.log(req.file);
        console.log("==========================");

        if (!req.file.path) {
            return res.status(500).json({
                message: "Cloudinary upload failed. No file path found."
            });
        }

        const videoUrl = req.file.path;

        console.log("Cloudinary URL:", videoUrl);

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: videoUrl,
            foodPartner: req.foodPartner._id
        });

        console.log("Saved in MongoDB:", foodItem.video);

        return res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });

    } catch (error) {
        console.error("========== CREATE FOOD ERROR ==========");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);

        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});

        console.log("Total foods:", foodItems.length);
        console.log("Latest:", foodItems[foodItems.length - 1]);


        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function likeFood(req, res) {
    try {
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

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function saveFood(req, res) {
    try {
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

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function getSaveFood(req, res) {
    try {
        const user = req.user;

        const savedFoods = await saveModel.find({
            user: user._id
        }).populate("food");

        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function addComment(req, res) {
    try {

        const { foodId, text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        const comment = await commentModel.create({
            food: foodId,
            user: req.user._id,
            text
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {
                commentsCount: 1
            }
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function getComments(req, res) {

    try {

        const { foodId } = req.params;

        const comments = await commentModel
            .find({
                food: foodId
            })
            .populate("user", "fullname")
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            comments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
    addComment,
    getComments
};