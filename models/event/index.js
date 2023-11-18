const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES, INITIATOR_TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');
const { EVENT_TYPES, ACTIVITY_TYPES } = require("./constants")

const eventSchema = new mongoose.Schema({
    Initiator: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },

    initiatorType: {
        type: String,
        enum: INITIATOR_TYPES,
        required: true,
    },

    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },

    desc: {
        type: String,
        maxlength: 300
    },

    Collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER
    }],

    type: {
        type: String,
        enum: EVENT_TYPES,
        required: true,
        default: 'fixed',
    },

    interval: {
        type: Number,
    },

    activity: {
        type: String,
        enum: ACTIVITY_TYPES,
        required: true,
    },

    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    },

    notifyMe: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
})

const Event = mongoose.model(MODELS.EVENT, eventSchema)

exports.Event = Event