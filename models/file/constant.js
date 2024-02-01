const { MODELS } = require("../../constant/models")

const FILES_FIELD = {
    CREATE: [
        'desc',
        'protected',
    ],
    INFO: [
        '_id',
        'Tags',
        'alias',
        'url',
        'name',
        'desc',
        'cited',
        'protected',
        'Initiator',
        'size',
        'format',
        'type',
    ],
    POPULATE: [
        {
            path: 'Tags',
        },
    ],
}

const FILE_TYPES = [
    'paper',
    'report',
    'milestone_tasks',
]

module.exports = {
    FILES_FIELD,
    FILE_TYPES,
}