const GROUP_FIELDS = {
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
    GROUP_FIELDS
}