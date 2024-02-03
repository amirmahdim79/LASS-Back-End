const DOCUMENT_FIELDS = {
    CREATE: [
        'Supervisor',
        'Users',
        'Lab',
        'documentId',
        'name',
        'desc',
    ],
    INFO: [
        'Supervisor',
        'Users',
        'Lab',
        'documentId',
        'name',
        'desc',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Users',
            select: '-password -permissions',
        },
        {
            path: 'Supervisor',
            select: '-password -permissions',
        },
    ],
}

module.exports = { 
    DOCUMENT_FIELDS
}