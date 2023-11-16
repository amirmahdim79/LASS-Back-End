const EVENT_TYPES = [
    'fixed',
    'weekly',
    'monthly',
]

const ACTIVITY_TYPES = [
    'upload',
    'meeting',
]

const EVENT_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'type',
        'interval',
        'activity',
        'start',
        'end',
        'notifyMe',
        'Collaborators',
    ],
    INFO: [
        'Initiator',
        'initiatorType',
        'name',
        'desc',
        'type',
        'interval',
        'activity',
        'start',
        'end',
        'isActive',
        'Collaborators',
        'notifyMe',
        'Lab',
    ],
    POPULATE: [
        {
            path: 'Collaborators',
            select: '-password -permissions',
        },
    ],
}

module.exports = {
    EVENT_TYPES,
    ACTIVITY_TYPES,
    EVENT_FIELDS,
}