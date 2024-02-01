const MESSAGES = {
    PATH_NOT_FOUND: 'Path not found.',
    TASK_NOT_FOUND: 'Task not found.',
    MILESTONE_NOT_FOUND: 'Milestone not found.',
    LAB_NOT_FOUND: 'Lab not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    LAB_NOT_FOUND: 'Lab not found.',
    STATUS_NOT_FOUND: 'Status not found.',
    NO_FILE: 'You must upload a file.',
    BAD_FORMAT: 'Bad format.',
    UPLOAD_FAILED: 'Upload failed',
}

const TASK_FIELDS = {
    CREATE: [
        'type',
        'interval',
        'activity',
        'name',
        'desc',
        // 'sandGain',
    ],
    CREATE_RES: [
        'Milestone',
        'type',
        'interval',
        'activity',
        'name',
        'desc',
        'status',
        '_id',
        // 'sandGain',
    ],
    INFO: [
        'Milestone',
        'type',
        'interval',
        'activity',
        'name',
        'desc',
        'status',
        // 'sandGain',
        '_id',
    ],
    POPULATE: [
    ],
}

module.exports = { 
    MESSAGES,
    TASK_FIELDS,
}