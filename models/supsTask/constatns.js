const SUPS_TASK_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'Supervisor',
        'User',
        'Lab',
        'Milestone',
        'status',
        'type',
    ],
    INFO: [
        'name',
        'desc',
        'Supervisor',
        'User',
        'Lab',
        'Milestone',
        'status',
        'type',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Supervisor',
            select: '-password',
        },
        {
            path: 'Milestone',
            populate: [
                {
                    path: 'Tasks',
                    populate: {
                        path: 'status',
                        populate: [
                            {
                                path: 'File'
                            }
                        ]
                    }
                },
                {
                    path: 'status',
                }
            ],
        },
        {
            path: 'User',
            select: '-password -permissions',
        },
    ],
}

const SUPS_TASK_TYPES = [
    'milestone_check',
]

module.exports = { 
    SUPS_TASK_FIELDS,
    SUPS_TASK_TYPES,
}