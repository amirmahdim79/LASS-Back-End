const FORUM_FIELDS = {
    CREATE: [
        'Users',
        'name',
        'desc',
        'Lab',
    ],
    INFO: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Messages',
        'MessagesStatus',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Users',
            select: '-password -permissions',
        },
        {
            path: 'Messages',
        },
    ],
}

module.exports = { 
    FORUM_FIELDS
}