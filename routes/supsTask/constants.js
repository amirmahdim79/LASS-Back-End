const MESSAGES = {
    PATH_NOT_FOUND: 'Path not found.',
    TASK_NOT_FOUND: 'Task not found.',
    MILESTONE_NOT_FOUND: 'Milestone not found.',
    LAB_NOT_FOUND: 'Lab not found.',
    FORUM_NOT_FOUND: 'Forum not found.',
    TEXT_NOT_PROVIDED: 'Text not provided.',
    SENDER_TYPE_NOT_PROVIDED: 'Sender type not provided.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    STATUS_NOT_FOUND: 'Status not found.',
    USERS_NOT_PROVIDED: 'You must at least add two users to a group.',
    GROUP_NOT_EXISTS: 'Group does not exists.',
    NO_PERMISSION: 'You dont have permission.',
    DELETED_SUCCESSFULLY: 'Group deleted successfully.',
    USER_TASK_NOT_FOUND: 'User task not found.',
    NO_FILE: 'You must upload a file.',
    BAD_FORMAT: 'Bad format.',
    UPLOAD_FAILED: 'Upload failed',
}

const ALLOWED_FORMATS = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
]

module.exports = { 
    MESSAGES,
    ALLOWED_FORMATS,
}