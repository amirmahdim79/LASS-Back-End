const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const enrollmentSchema = new mongoose.Schema({
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true
    },

    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true
    },

    supervisorSign: {
        type: Boolean,
        default: false,
    },

    studentSign: {
        type: Boolean,
        default: false,
    },

    enrolled: {
        type: Boolean,
        default: false,
    },

    enrolledDate: {
        type: Date,
    },

}, {
    timestamps: true,
})

const Enrollment = mongoose.model(SUBMODELS.LAB_ENROLLMENT, enrollmentSchema)

exports.Enrollment = Enrollment