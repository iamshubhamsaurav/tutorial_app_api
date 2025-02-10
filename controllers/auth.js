const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncHandler = require('../utils/asyncHandler')
const crypto = require('crypto')

//@desc     Signup User
//@route    POST /api/v1/auth/signup
//@access   Public
exports.signup = asyncHandler(async (req, res, next) => {
    // check if email and password exists
    if(!req.body.email || !req.body.password || !req.body.name) {
        return next(new AppError("Email, password or name not entered", 400))
    }

    // encrypting the password
    // const SECRET_KEY = crypto.randomBytes(32)
    // const iv = crypto.randomBytes(16)
    // // const cipher = crypto.createCipheriv('aes192', SECRET_KEY)
    // const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv) 
    // let encrypted = cipher.update(req.body.password, 'utf8', 'hex')  
    // encrypted += cipher.final('hex')

    // req.body.password = encrypted
    
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
// I am changing this code block -S.K
// The axios in my fron end can not send a body with a get request
// It can only send query 'params' 
exports.login = asyncHandler(async (req, res, next) => {
    // check if email and password exists
    if(!req.params.email || !req.params.password) {
        return next(new AppError("Email or password not entered", 400))
    }
    
    // find the user with the same email
    const user = await User.findOne({email: req.params.email})
    if(!user) {
        return next(new AppError("User Not Found with the email", 404));
    }

    // decrypting the password
    // const SECRET_KEY = "1214"
    // const decipher = crypto.createDecipheriv('aes192', SECRET_KEY) 
    // let encrypted = user.password  
    // let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    // decrypted += decipher.final('utf8')
    
    // // setting the user password to decrypted password and sending it to client
    // user.password = decrypted

    if(req.params.password.toString() !== user.password.toString()) {
        return next(new AppError("Password does not match", 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})