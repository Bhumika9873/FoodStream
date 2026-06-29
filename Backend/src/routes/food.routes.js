const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "FoodStream",
        resource_type: "video"
    }
});

const upload = multer({ storage });

router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
);

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
);

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
);

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
);

module.exports = router;
