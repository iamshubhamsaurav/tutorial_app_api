const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')


//@desc     Get all users
//@route    GET /api/v1/users/
//@access   Public
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})

//@desc     Get single user
//@route    GET /api/v1/users/:id
//@access   Public
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new AppError(`User not found with the id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

