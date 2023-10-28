const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const voteSchema = new mongoose.Schema({
    Tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.TAG,
        required: true
    },

    User: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    userType: {
        type: String,
        required: true,
        enum: [MODELS.USER, MODELS.SUPERVISOR],
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Vote = mongoose.model(SUBMODELS.TAG_VOTE, voteSchema)

exports.Vote = Vote