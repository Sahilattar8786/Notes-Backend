const express=require('express');
const {registerUser, authUser,updateUserProfile}=require("../Controller/userController");
const router=express.Router()
const {protect}=require("../Middlewares/authMiddleware");
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route("/profile").post(protect,updateUserProfile);

module.exports = router;