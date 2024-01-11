const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const presenceFormSchema = new mongoose.Schema({
    Forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.FORUM,
        required: true,
    },

    list: [
        /*
            {
                id: {
                    status: present/absent/optional
                }
            }
        */
    ],

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const PresenceForm = mongoose.model(SUBMODELS.PRESENCE_FORM, presenceFormSchema)

exports.PresenceForm = PresenceForm