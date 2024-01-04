const FORUM_FIELDS = {
    CREATE: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Start',
    ],
    INFO: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Messages',
        'MessagesStatus',
        'Start',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Users',
            select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        },
        {
            path: 'Messages',
        },
    ],
}

module.exports = { 
    FORUM_FIELDS
}