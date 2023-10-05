const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const milestoneSchema = new mongoose.Schema({
    //TODO: add flow; name sug: Flow|Path|Journey|Steps
    // Flow: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: MODELS.SUPERVISOR
    // },

    name: {
        type: String,
        minlength: 1,
        maxlength: 100
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