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
        'Initiator',
        'InitiatorType',
        'name',
        'desc',
        'type',
        'interval',
        'activity',
        'start',
        'end',
        'notifyMe',
    ],
    INFO: [
        'Initiator',
        'InitiatorType',
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
    ],
    POPULATE: [
        {
            path: 'Collaborators',
        },
    ],
}

module.exports = {
    EVENT_TYPES,
    ACTIVITY_TYPES,
    EVENT_FIELDS,
}