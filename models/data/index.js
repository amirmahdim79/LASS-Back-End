const mongoose = require("mongoose")
const { MODELS } = require('../../constant/models')

const dataSchema = new mongoose.Schema({
    action: {
        type: String,
    },
    payload: {
        type: Object,
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
}, {
    timestamps: true,
})

const Data = mongoose.model(MODELS.DATA, dataSchema)

exports.Data = Data