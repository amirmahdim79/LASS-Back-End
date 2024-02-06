const NOTIFICATION_FIELDS = {
    CREATE: [
        'User',
        'text',
        'url',
    ],
    INFO: [
        'User',
        'text',
        'url',
        'read',
        '_id',
    ],
    POPULATE: [
        {
            path: 'User',
            select: '-password -permissions -RecentFiles',
        },
    ],
}

module.exports = { 
    NOTIFICATION_FIELDS
}