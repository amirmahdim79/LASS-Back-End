const { Activity } = require("../models/activity")
const _ = require('lodash');

const CREATE_NEW_ACTIVITY = (userId, labId, key, text = '', data = null) => {
    const activity = new Activity({
        User: userId,
        Lab: labId,
        key,
        text,
        data,
    })

    activity.save()
}

module.exports = {
    CREATE_NEW_ACTIVITY,
}