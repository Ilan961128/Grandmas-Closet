/**
 * @typedef {Object} UserSchema
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} admin - The admin status of the user.
 * @property {string} secret_phrase - The secret phrase of the user.
 */
const mongoose = require('mongoose')

const usersSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "please enter your first name"]
        },
        last_name: {
            type: String,
            required: [true, "please enter your last name"]
        },
        email: {
            type: String,
            required: [true, "please enter your email"]
        },
        password: {
            type: String,
            required: [true, "please enter your password"]
        },
        admin: {
            type: String,
            required: [false, "please enter your admin status"]
        },
        secret_phrase: {
            type: String,
            required: [true, "please enter your secret phrase"]
        },
    }
)

const User = mongoose.model('users', usersSchema);

module.exports = User;


