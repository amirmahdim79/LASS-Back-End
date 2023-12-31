const FORUM_FIELDS = {
    CREATE: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Start',
        'Supervisor',
    ],
    INFO: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Messages',
        'MessagesStatus',
        'Start',
        'Supervisor',
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