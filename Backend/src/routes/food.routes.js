const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "FoodStream",
        resource_type: "video"
    })
});

const upload = multer({ storage });

router.post(
    '/',
    authMiddleware.authFoodPartnerMiddleware,

    // DEBUG BEFORE MULTER
    (req, res, next) => {
        console.log("========== BEFORE MULTER ==========");
        next();
    },

    upload.single("video"),

    // DEBUG AFTER MULTER
    (req, res, next) => {
        console.log("========== AFTER MULTER ==========");
        console.log(req.file);
        console.log("==================================");
        next();
    },

    foodController.createFood
);

router.get(
    "/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
);

router.post(
    '/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
);

router.post(
    '/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
);

router.get(
    '/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
);

module.exports = router;