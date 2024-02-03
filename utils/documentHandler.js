const { google } = require('googleapis')
const fs = require('fs');

const DOC_BASE = 'https://docs.google.com/document/d/'

// const auth = new google.auth.GoogleAuth({
//     credentials: apiKey,
//     scopes: ['https://www.googleapis.com/auth/documents'],
//     client_email: 'ilab.ut.ac@gmail.com'
// })

// const docs = google.docs({ version: 'v1', auth })

// const drive = google.drive({
//     version: 'v3',
//     auth: apiKey,
// });

const credentials = JSON.parse(fs.readFileSync('config/ilabdocs-9989f47c0c01.json'));
const { client_email, private_key } = credentials;

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email,
        private_key,
    },
    // scopes: ['https://www.googleapis.com/auth/documents'],
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// const docs = google.docs({ version: 'v1', auth });
const drive = google.drive({ version: 'v3', auth });

const CREATE_AND_SHARE = async (name, emailList) => {
    const document = await drive.files.create({
        resource: {
          mimeType: 'application/vnd.google-apps.document',
          name,
        },
        fields: 'id',
    });

    const documentId = document.data.id;

    // Share the document with the specified emails
    await Promise.all(emailList.map(async (email) => {
      await drive.permissions.create({
        fileId: documentId,
        requestBody: {
          role: 'writer',
          type: 'user',
          emailAddress: email,
        },
      });
    }))

    return documentId
}

module.exports = {
    DOC_BASE,
    CREATE_AND_SHARE,
}