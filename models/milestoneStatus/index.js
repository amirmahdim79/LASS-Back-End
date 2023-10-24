const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const milestoneStatusSchema = new mongoose.Schema({
    Milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.MILESTONE,
        required: true
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true
    },

    status: {
        type: Boolean,
        default: false,
    },

    data: {

    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const MilestoneStatus = mongoose.model(SUBMODELS.MILESTONE_STATUS, milestoneStatusSchema)

exports.MilestoneStatus = MilestoneStatus