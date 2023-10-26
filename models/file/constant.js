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
    ],
    POPULATE: [
        {
            path: 'Initiator',
            model: MODELS.USER
        },
    ],
}

module.exports = {
    FILES_FIELD,
}