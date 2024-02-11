const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const pathSchema = new mongoose.Schema({
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB
    },

    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },

    desc: {
        type: String,
        maxlength: 300
    },

    typeDependency: [{
        type: String,
        enum: TYPES,
        required: true,
    }],

    Milestones: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.MILESTONE
        }],
        default: []
    },

    sandGain: {
        type: Number,
        default: 100,
        required: true,
    },

    url: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Path = mongoose.model(MODELS.PATH, pathSchema)

exports.Path = Path