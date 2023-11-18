const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const crypto = require('crypto');
const { MODELS } = require('../../constant/models')
const Joi = require('joi');

const supervisorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
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

    url: {
        type: String,
        unique: true
    },

    profilePicture: {
        type: String,
    },

    MODEL_TYPE: {
        type: String,
        default: MODELS.SUPERVISOR
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

supervisorSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get(GLOBALCONST.JWTPR), { expiresIn: GLOBALCONST.EXPIRITION_TIME })
}

const Supervisor = mongoose.model(MODELS.SUPERVISOR, supervisorSchema)

exports.Supervisor = Supervisor
exports.validateSupervisor = validate