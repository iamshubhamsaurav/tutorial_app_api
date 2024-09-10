const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the user"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email for the user"],
        trim: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Please provide the password for the user"],
        minLength: [6, 'Password cannot be less than 6 characters']
    },
    // passwordConfirm: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
} )

const User = mongoose.model('User', userSchema)

module.exports = User