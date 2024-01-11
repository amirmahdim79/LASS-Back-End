const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../constant')
const crypto = require('crypto');
const { MODELS, TYPES } = require('../constant/models')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    Labs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB
    }],

    Tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.TAG
    }],

    firstName: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    permissions: {
        type: Array,
        default: []
    },

    type: {
        type: String,
        enum: TYPES,
    },

    url: {
        type: String,
        unique: true
    },
    profilePicture: {
        type: String,
    },

    MODEL_TYPE: {
        type: String,
        default: MODELS.USER
    },

    RecentFiles: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.FILE
        }],
        default: []
    },

    smarties: {
        type: Number,
        default: 0,
    },

    sand: {
        type: Number,
        default: 30,
    },


}, {
    timestamps: true,
})

const validate = (req) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(req)
}

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get(GLOBALCONST.JWTPR), { expiresIn: GLOBALCONST.EXPIRITION_TIME })
}

const User = mongoose.model(MODELS.USER, userSchema)

exports.User = User
exports.validateUser = validate