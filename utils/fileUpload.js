const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const config = require('config');
const { cleanUploadedFile } = require('./cleanUploadedFile');

const UPLOAD_BASE = 'https://lass.s3.ir-thr-at1.arvanstorage.ir/'

const s3 = new S3Client({
    region: 'default',
    endpoint: config.get('fileCloudUrl'),
    credentials: {
        accessKeyId: config.get('s3AccessKeyId'),
        secretAccessKey: config.get('s3SecretAccessKey'),
    },
})

const uploadParams = {
    Bucket: 'lass', // bucket name
    Key: 'test', // the name of the selected file
    ACL: 'public-read', // 'private' | 'public-read'
    Body: 'BODY',
};

const UPLOAD = async (file, name, folder = '') => {
    uploadParams.Key = `${folder}/` + name ?? file.originalname;
    uploadParams.Body = fs.readFileSync(file.path);

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        cleanUploadedFile(file)
        return data
    } catch (err) {
        console.log(err)
        cleanUploadedFile(file)
        return false
    }
};

module.exports = {
    UPLOAD,
    UPLOAD_BASE,
}