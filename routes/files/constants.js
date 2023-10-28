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

const GPT_PROPMTS = {
    MINE_PAPER_TAGS: 'Give me a json of an array of a list of 10 most relevant tags to this document: ',
}

module.exports = { 
    MESSAGES,
    ALLOWED_FORMATS,
    GPT_PROPMTS,
}