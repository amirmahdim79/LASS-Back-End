const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../constant')
const crypto = require('crypto');
const { MODELS } = require('../constant/models')
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
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
        default: ['super-admin']
    },
}, {
    timestamps: true,
})

adminSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get(GLOBALCONST.JWTPR), { expiresIn: GLOBALCONST.EXPIRITION_TIME })
}

const Admin = mongoose.model(MODELS.ADMIN, adminSchema)

exports.Admin = Admin