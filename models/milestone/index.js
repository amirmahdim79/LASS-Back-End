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

    name: {
        type: String,
        minlength: 1,
        maxlength: 100
    },

    desc: {
        type: String,
        minlength: 1,
        maxlength: 300
    },

    status: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Milestone = mongoose.model(MODELS.MILESTONE, milestoneSchema)

exports.Milestone = Milestone