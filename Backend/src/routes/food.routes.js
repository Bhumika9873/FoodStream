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

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB
    }
});

router.post(
    '/',
    authMiddleware.authFoodPartnerMiddleware,

    (req, res, next) => {
        console.log("========== BEFORE MULTER ==========");
        next();
    },

    (req, res, next) => {
        upload.single("video")(req, res, function (err) {

            if (err) {
                console.error("========== MULTER/CLOUDINARY ERROR ==========");
                console.error(err);
                console.error("Message:", err.message);
                console.error("Stack:", err.stack);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            console.log("========== AFTER MULTER ==========");
            console.log(req.file);
            console.log("=================================");

            next();
        });
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