const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const milestoneSchema = new mongoose.Schema({
    Path: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.PATH
    },

    Tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.TASK
    }],

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

    status: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: SUBMODELS.MILESTONE_STATUS
    }],

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Milestone = mongoose.model(MODELS.MILESTONE, milestoneSchema)

exports.Milestone = Milestone