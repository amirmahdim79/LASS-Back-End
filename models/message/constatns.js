const MESSAGE_FIELDS = {
    CREATE: [
        'Sender',
        'senderType',
        'Forum',
        'text',
    ],
    INFO: [
        'Sender',
        'senderType',
        'Forum',
        'text',
        '_id',
    ],
    POPULATE: [
        // {
        //     path: 'Users',
        //     select: '-password -permissions',
        // },
    ],
}

module.exports = { 
    MESSAGE_FIELDS
}