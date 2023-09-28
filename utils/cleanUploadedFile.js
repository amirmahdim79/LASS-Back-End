const fs = require('fs');
const cleanUploadedFile = (file) => {
    fs.unlink(file.path, (unlinkError) => {
        if (unlinkError) {
            console.error('Failed to delete the uploaded file:', unlinkError);
        }
    });
}

module.exports = {
    cleanUploadedFile
}