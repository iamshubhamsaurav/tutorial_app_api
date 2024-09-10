const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')


//@desc     Signup User
//@route    POST /api/v1/auth/signup
//@access   Public
exports.signup = asyncHandler(async (req, res, next) => {
    // check if email and password exists
    if(!req.body.email || !req.body.password || !req.body.name) {
        return next(new AppError("Email, password or name not entered", 400))
    }
    
    req.body.role = 'user'
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user
    })
})

//@desc     Login User
//@route    GET /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
    // check if email and password exists
    if(!req.body.email || !req.body.password) {
        return next(new AppError("Email or password not entered", 400))
    }
    
    // find the user with the same email
    const user = await User.findOne({email})
    if(!user) {
        return next(new AppError("User Not Found with the email", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})