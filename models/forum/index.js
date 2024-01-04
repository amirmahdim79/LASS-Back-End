const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const forumSchema = new mongoose.Schema({
    Supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.SUPERVISOR,
        required: true,
    },

    Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER
    }],

    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },

    desc: {
        type: String,
        minlength: 1,
        maxlength: 300
    },

    Messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: SUBMODELS.MESSAGE
    }],

    MessagesStatus: {
        //user map to number of read messages
    },

    start: {
        type: Date,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Forum = mongoose.model(MODELS.FORUM, forumSchema)

exports.Forum = Forum