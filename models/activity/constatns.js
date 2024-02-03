const ACTIVITY_MODEL_FIELDS = {
    CREATE: [
        'User',
        'Lab',
        'key',
        'text',
        'data',
    ],
    INFO: [
        'User',
        'Lab',
        'key',
        'text',
        'data',
        '_id',
    ],
    POPULATE: [
        {
            path: 'User',
            select: '-password -permissions',
        },
    ],
}

module.exports = { 
    ACTIVITY_MODEL_FIELDS
}