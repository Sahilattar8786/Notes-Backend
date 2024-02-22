const asyncHandler=require('express-async-handler');
const User=require('../Model/userModel'); // Import your User model
const generateToken = require('../utils/genearatetoken');
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;
    try {
        let userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = await User.create({ name, email, password, pic });
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin, // Assuming you have isAdmin field
                pic: newUser.pic
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const authUser = async (req, res) => {
    const {  email, password } = req.body;
        const user=await User.findOne({email})

        if(user && await user.matchPassword(password)){
            res.json({
                _id:  user._id,
                name:  user.name,
                email: user.email,
                isAdmin: user.isAdmin, // Assuming you have isAdmin field
                pic: user.pic,
                token:generateToken(user._id),// Generate and return the token along with the user data.
        })}else{
            res.status(400);
            throw new Error('Invalid Email or Password')
        }
};


// const registerUser=(req,res)=>
// {
//     const { name, email, password,pic}=req.body;
//     res.send({
//         name,email,password,pic
//     })
// }


module.exports = {
    registerUser,authUser
};
