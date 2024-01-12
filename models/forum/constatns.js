const FORUM_FIELDS = {
    CREATE: [
        'Users',
        'name',
        'desc',
        'Lab',
        'Start',
        'Supervisor',
        'PresenceForm',
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
        'PresenceForm',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Users',
            select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        },
        {
            path: 'Supervisor',
            select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        },
        {
            path: 'Messages',
        },
        {
            path: 'PresenceForm',
        },
    ],
}

module.exports = { 
    FORUM_FIELDS
}