
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';
 

// @desc   Auth user/set token,[ Login ]
// route   POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name
        });
    } else {
        res.status(401);
        throw new Error("email or Password incorrect")
    }


});


// @desc    Register a new user
// route    POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(400)
        throw new Error('User Alredy exist');
    }

    const user = await User.create({
        name,
        email,
        password
    });
     
    if(user) {
        generateToken(res, user._id)    //sends the cookie

        res.status(201).json({          //sends the response
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400);
        throw new Error("Invalid User data")
    }
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });    //new Date(0) means that the cookie will expire right away
    res.status(200).json({ message: "User Logged out" })
});

// @desc    Get User Profile
// route    GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile"})
});

// @desc    Update User Profile
// route    PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    try {
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: req.body.password ? "pasword Updated" : "password was not updated"
        })
    } catch (error) {
        res.status(404);
        throw new Error("Error in updating")
    }    
});



export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}