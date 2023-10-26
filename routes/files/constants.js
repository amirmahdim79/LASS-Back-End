const MESSAGES = {
    NO_FILE: 'No file was provided.',
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