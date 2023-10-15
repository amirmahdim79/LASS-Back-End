const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const tagSchema = new mongoose.Schema({
    VoteList: {
        type: [{
            type: mongoose.Schema.Types.Mixed,
        }],
        default: []
    },

    name: {
        type: String,
        minlength: 1,
        maxlength: 100
    },

    score: {
        type: Number,
        default: 0,
        min: 0,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Tag = mongoose.model(MODELS.TAG, tagSchema)

exports.Tag = Tag