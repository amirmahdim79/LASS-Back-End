const MILESTONE_STATUS_FIELDS = {
    CREATE: [
        'Milestone',
        'User',
        'Data',
        'doneDate',
    ],
    INFO: [
        'Milestone',
        'User',
        'Data',
        'Status',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Milestone',
        },
        {
            path: 'User',
            select: '-password',
        },
    ],
}

module.exports = { 
    MILESTONE_STATUS_FIELDS
}